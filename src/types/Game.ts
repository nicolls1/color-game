export interface Game {
  id: string
  createTime: Date
  docVersion: number
  roundsCompleted: number
  rounds: Round[]
  players: { name: string; points: number }[]
}

export enum COLORS {
  WHITE = 'white',
  BLACK = 'black',
  GRAY = 'gray',
  RED = 'red',
  BLUE = 'blue',
  GREEN = 'green',
  YELLOW = 'yellow',
  PINK = 'pink',
  ORANGE = 'orange',
  VIOLET = 'violet',
  BROWN = 'brown',
}

export interface Round {
  createTime: Date
  question: Question
  answers: Record<number, COLORS[]>
}

export interface Question {
  id: string
  question: string
  answer: COLORS[]
}
