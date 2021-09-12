import { COLORS } from 'types/game'

export const answersMatch = (
  guessColors: COLORS[],
  correctColors: COLORS[]
): boolean => {
  const answers = Array.from(new Set(guessColors))
  return (
    answers.length === correctColors.length &&
    answers.every((value) => correctColors.includes(value))
  )
}

export const calculateNewPoints = (
  playerCount: number,
  roundAnswers: COLORS[],
  playerAnswers: Record<number, COLORS[]>
) => {
  const correctPlayers = [...Array(playerCount).keys()].map(
    (idx) =>
      idx in playerAnswers &&
      answersMatch(playerAnswers[idx as unknown as number], roundAnswers)
  )
  const incorrectCount =
    playerCount -
    correctPlayers.reduce((sum, value) => (value === true ? sum + 1 : sum), 0)
  return correctPlayers.map((correct) => (correct ? incorrectCount : 0))
}
