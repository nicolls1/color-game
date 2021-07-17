import { COLORS } from 'types/Game'

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
