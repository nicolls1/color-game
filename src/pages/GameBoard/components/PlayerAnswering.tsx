import { Button } from '@chakra-ui/button'
import { Checkbox, CheckboxGroup } from '@chakra-ui/checkbox'
import { Stack, Text } from '@chakra-ui/layout'
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/progress'
import { useRoundTimeUsed, useSendAnswerMutation } from 'hooks/game'
import { useState } from 'react'
import { ROUND_TIME } from 'ts/siteConstants'

import { COLORS, Game } from 'types/game'

interface Props {
  game: Game
  playerIndex: number
}

const PlayerAnswering: React.FC<Props> = ({ game, playerIndex }) => {
  const currentRound = game!.rounds[game!.roundsCompleted]
  const [checkedValues, setCheckedValues] = useState<COLORS[]>([])
  const sendAnswerMutation = useSendAnswerMutation()
  const timeUsed = useRoundTimeUsed(game)

  return (
    <Stack
      direction="column"
      spacing={5}
      minH="100vh"
      justify="center"
      align="center"
      p={5}
    >
      <Text>{currentRound.question.question}</Text>
      <Text>
        choose <b>{currentRound.question.answer.length}</b> colors
      </Text>
      <CircularProgress max={ROUND_TIME} min={0} value={timeUsed}>
        <CircularProgressLabel>{ROUND_TIME - timeUsed}</CircularProgressLabel>
      </CircularProgress>
      <CheckboxGroup
        onChange={(value) => setCheckedValues(value as COLORS[])}
        value={checkedValues}
      >
        <Stack direction="column">
          {Object.keys(COLORS).map((key, idx) => (
            <Checkbox key={key} value={key.toLowerCase()} w="fit-content">
              {key.toLowerCase()}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
      <Button
        onClick={() =>
          sendAnswerMutation.mutate({
            game,
            playerIndex,
            answer: checkedValues,
          })
        }
      >
        Submit
      </Button>
    </Stack>
  )
}
export default PlayerAnswering
