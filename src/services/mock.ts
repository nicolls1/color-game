import { COLORS, Game, Question } from 'types/game'

const MockService = {
  getGame: async (id: string) => {
    return {
      undefined: undefined,
      'one-player-joined': {
        id: 'one-player-joined',
        players: [{ points: 0, name: 'p1' }],
        roundsCompleted: -1,
        rounds: [],
        docVersion: 0,
        createTime: new Date('2021-07-27T17:34:28.281Z'),
      },
      'game-full': {
        id: 'game-full',
        players: [
          { points: 0, name: 'p1' },
          { points: 0, name: 'p2' },
          { points: 0, name: 'p3' },
          { points: 0, name: 'p4' },
        ],
        roundsCompleted: -1,
        rounds: [],
        docVersion: 0,
        createTime: new Date('2021-07-27T17:34:28.281Z'),
      },
      'player-answering': {
        id: 'player-answering',
        players: [
          { points: 0, name: 'p1' },
          { points: 0, name: 'p2' },
        ],
        roundsCompleted: 0,
        rounds: [
          {
            createTime: new Date(),
            question: {
              id: '3',
              question: "Canada's flag",
              answer: ['red', 'white'],
            },
            answers: {},
          },
        ],
        createTime: new Date('2021-07-28T13:54:26.731Z'),
        docVersion: 2,
      },
      'player-rejoining': {
        id: 'player-rejoining',
        players: [
          { points: 0, name: 'p1' },
          { points: 0, name: 'p2' },
        ],
        roundsCompleted: 0,
        rounds: [
          {
            createTime: new Date(),
            question: {
              id: '3',
              question: "Canada's flag",
              answer: ['red', 'white'],
            },
            answers: {},
          },
        ],
        createTime: new Date('2021-07-28T13:54:26.731Z'),
        docVersion: 2,
      },
      'waiting-for-other-answers': {
        id: 'waiting-for-other-answers',
        players: [
          { points: 0, name: 'p1' },
          { points: 0, name: 'p2' },
        ],
        roundsCompleted: 0,
        rounds: [
          {
            createTime: new Date(),
            question: {
              id: '3',
              question: "Canada's flag",
              answer: ['red', 'white'],
            },
            answers: {
              0: ['red', 'white'],
            },
          },
        ],
        createTime: new Date('2021-07-28T13:54:26.731Z'),
        docVersion: 2,
      },
      'round-over': {
        id: 'round-over',
        players: [
          { points: 1, name: 'p1' },
          { points: 0, name: 'p2' },
        ],
        roundsCompleted: 1,
        rounds: [
          {
            createTime: new Date(),
            question: {
              id: '3',
              question: "Canada's flag",
              answer: ['red', 'white'],
            },
            answers: {
              0: ['red', 'white'],
            },
          },
        ],
        createTime: new Date('2021-07-28T13:54:26.731Z'),
        docVersion: 2,
      },
      'game-over': {
        id: 'game-over',
        players: [
          { points: 10, name: 'p1' },
          { points: 5, name: 'p2' },
        ],
        roundsCompleted: 1,
        rounds: [
          {
            createTime: new Date(),
            question: {
              id: '3',
              question: "Canada's flag",
              answer: ['red', 'white'],
            },
            answers: {
              0: ['red', 'white'],
            },
          },
        ],
        createTime: new Date('2021-07-28T13:54:26.731Z'),
        docVersion: 2,
      },
    }[id]
  },
  watchGame: (id: string, cb: (data?: Game) => void) => {
    return () => {}
  },
  createGame: async (id: string, playerName: string) => {},
  joinGame: async (game: Game, playerName: string) => {},
  nextRound: async (game: Game, question: Question) => {},
  sendAnswer: async (game: Game, playerIndex: number, answer: COLORS[]) => {},
  endRound: async (game: Game) => {},
  getQuestion: async (questionCount: number, seenQuestionIds?: string[]) => {},
  getQuestionCount: async () => {},
  resetGame: async (game: Game) => {},
}
export default MockService
