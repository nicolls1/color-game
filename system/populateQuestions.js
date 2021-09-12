/**
 * Set all questions.
 *
 * Run from project root with: node system/populateQuestions.js
 */
const admin = require('firebase-admin')

var questions = require('./../data/questions.json')

let firebase
const LOCAL_EMULATOR = true
if (LOCAL_EMULATOR) {
  firebase = admin.initializeApp({ projectId: 'color-game-1d4bf' })
  firebase.firestore().settings({
    host: 'localhost:8082',
    ssl: false,
  })
} else {
  var stageServiceAccount = require('./../color-game-key.json')
  firebase = admin.initializeApp({
    credential: admin.credential.cert(stageServiceAccount),
  })
}

const firestore = admin.firestore(firebase)

const setQuestions = async () => {
  const writer = firestore.bulkWriter()
  questions.forEach((question, idx) => {
    writer.create(
      firestore.collection('questions').doc(idx.toString()),
      question
    )
  })
  writer.update(firestore.collection('questions').doc('meta'), {
    length: questions.length,
  })
  await writer.close()
}
setQuestions()
