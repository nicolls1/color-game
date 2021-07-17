import firebase from 'firebase/app'

import 'firebase/firestore'
import { answersMatch } from 'ts/utils'
import { COLORS, Game, Question } from 'types/Game'

var firebaseConfig = {
  apiKey: 'AIzaSyDABWq42QVaaw8YDFbGC8BWlZczbKPHfCI',
  authDomain: 'color-game-1d4bf.firebaseapp.com',
  projectId: 'color-game-1d4bf',
  storageBucket: 'color-game-1d4bf.appspot.com',
  messagingSenderId: '758651689635',
  appId: '1:758651689635:web:a32fd20c0bb7875d087d16',
}

try {
  firebase.initializeApp(firebaseConfig)
} catch (e) {
  console.error(e)
}

if (process.env.NODE_ENV === 'development') {
  console.log('Using local firebase DB.')
  firebase.firestore().settings({
    host: 'localhost:8081',
    ssl: false,
  })
}

// Inspiration: https://medium.com/swlh/using-firestore-with-typescript-65bd2a602945

// Base class for field serializers
interface FirestoreFieldSerializer<T, F> {
  toFirestore: (data: T) => F
  fromFirestore: (data: F) => T
}

interface DateSerializerOptions {
  autoUpdate: boolean
}

// Converting a Firebase Timestamp to date when used
const DateSerializer = (
  options: DateSerializerOptions = {
    autoUpdate: false,
  }
): FirestoreFieldSerializer<Date, firebase.firestore.Timestamp> => ({
  toFirestore: (data) => {
    if (options.autoUpdate) {
      return firebase.firestore.FieldValue.serverTimestamp() as unknown as firebase.firestore.Timestamp
    }
    return data
      ? firebase.firestore.Timestamp.fromDate(data)
      : // If value is not defined, assume that we are creating and want a default server timestamp value
        (firebase.firestore.FieldValue.serverTimestamp() as unknown as firebase.firestore.Timestamp)
  },
  fromFirestore: (data) => data.toDate(),
})

type FieldTransforms<F extends Record<string, any>> = {
  [K in keyof Partial<F>]: FirestoreFieldSerializer<any, any>
}

// Generic conversion for a collection in firebase to a typescript type with
// support for serializing specific fields
const converter = <T extends { id?: string; [key: string]: any }>(
  fieldTransforms?: FieldTransforms<T>
) => ({
  toFirestore: (data: T) => {
    data.id && delete data.id
    fieldTransforms &&
      Object.keys(fieldTransforms).forEach(
        (key) =>
          ((data as Record<string, any>)[key] = fieldTransforms[
            key
          ].toFirestore(data[key]))
      )
    return data
  },
  fromFirestore: (
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ) => {
    let snapshotData = snapshot.data()
    fieldTransforms &&
      Object.keys(fieldTransforms).forEach(
        (key) =>
          (snapshotData[key] = fieldTransforms[key].fromFirestore(
            snapshotData[key]
          ))
      )
    return { id: snapshot.id, ...snapshotData } as T
  },
})

export const getFirestore = (firestore: firebase.firestore.Firestore) => {
  // Define our collections in a database and apply a converter
  const collection = <T extends { id?: string } & Record<string, any>>(
    collectionPath: string,
    fieldTransforms?: FieldTransforms<T>
  ) =>
    firestore
      .collection(collectionPath)
      .withConverter(converter<T>(fieldTransforms))

  return {
    games: collection<Game>('games', {
      createTime: DateSerializer(),
    }),
    questions: collection<Question>('questions'),
  }
}

const db = getFirestore(firebase.firestore())

const convertGameRoundsCreateTime = (game?: Game) => {
  if (!game) {
    return game
  }
  game.rounds = game.rounds.map((round) => ({
    ...round,
    createTime: new Date(round.createTime as unknown as string),
  }))
  return game
}

const FirebaseService = {
  getGame: async (id: string) => {
    const gameDoc = await db.games.doc(id).get()
    return convertGameRoundsCreateTime(gameDoc.data())
  },
  watchGame: (id: string, cb: (data?: Game) => void) => {
    return db.games.doc(id).onSnapshot((doc) => {
      try {
        cb(convertGameRoundsCreateTime(doc.data()))
      } catch (e) {
        console.warn('Got invalid game doc, ignoring')
      }
    })
  },
  createGame: async (id: string, playerName: string) => {
    await db.games.doc(id).set({
      docVersion: 0,
      rounds: [],
      players: [{ name: playerName, points: 0 }],
      roundsCompleted: -1,
    } as any)
  },
  joinGame: async (game: Game, playerName: string) => {
    await db.games.doc(game.id).update({
      docVersion: game.docVersion + 1,
      players: [...game.players, { name: playerName, points: 0 }],
    })
    return game.players.length
  },
  nextRound: async (game: Game, question: Question) => {
    console.log('before', [
      ...game.rounds,
      {
        createTime: firebase.firestore.Timestamp.now(),
        question,
        answers: {},
      },
    ])
    await db.games.doc(game.id).update({
      roundsCompleted: game.roundsCompleted === -1 ? 0 : game.roundsCompleted,
      docVersion: game.docVersion + 1,
      rounds: [
        ...game.rounds.map((round) => ({
          ...round,
          createTime: round.createTime.toISOString(),
        })),
        {
          // issues here with using firebase.firestore.Timestamp.now(), maybe just emulator?
          createTime: new Date().toISOString(),
          question,
          answers: {},
        },
      ],
    })
  },
  sendAnswer: async (game: Game, playerIndex: number, answer: COLORS[]) => {
    const previousRounds = game.rounds.slice(0, -1)
    const currentRound = game.rounds[game.rounds.length - 1]
    await db.games.doc(game.id).update({
      docVersion: game.docVersion + 1,
      rounds: [
        ...previousRounds.map((round) => ({
          ...round,
          createTime: round.createTime.toISOString(),
        })),
        {
          ...currentRound,
          createTime: currentRound.createTime.toISOString(),
          answers: {
            ...currentRound.answers,
            [playerIndex]: answer,
          },
        },
      ],
    })
  },
  endRound: async (game: Game) => {
    const roundsAnswers = game.rounds[game.roundsCompleted].question.answer
    const playerAnswers = game.rounds[game.roundsCompleted].answers
    const correctPlayers = Object.keys(playerAnswers).map((key) => {
      return answersMatch(
        playerAnswers[key as unknown as number],
        roundsAnswers
      )
    })
    const incorrectCount = correctPlayers.reduce(
      (sum, value) => (value === false ? sum + 1 : sum),
      0
    )
    await db.games.doc(game.id).update({
      docVersion: game.docVersion + 1,
      roundsCompleted: game.roundsCompleted + 1,
      players: game.players.map((player, idx) => ({
        ...player,
        points: correctPlayers[idx]
          ? player.points + incorrectCount
          : player.points,
      })),
    })
  },
  getQuestion: async (seenQuestionIds?: string[]) => {
    const questionDoc = await db.questions.doc('bev91bDD4FPd66UB01uR').get()
    return questionDoc.data()
  },
  resetGame: async (game: Game) => {
    await db.games.doc(game.id).delete()
  },
}
export default FirebaseService
