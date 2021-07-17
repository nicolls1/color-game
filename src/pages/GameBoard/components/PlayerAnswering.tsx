import { Button } from '@chakra-ui/button'
import { Checkbox, CheckboxGroup } from '@chakra-ui/checkbox'
import { Box, Stack, Text } from '@chakra-ui/layout'
import { useSendAnswerMutation } from 'hooks/Game'
import { useState } from 'react'

import { COLORS, Game } from 'types/Game'

interface Props {
  game: Game
  playerIndex: number
}

const PlayerAnswering: React.FC<Props> = ({ game, playerIndex }) => {
  const currentRound = game!.rounds[game!.roundsCompleted]
  const [checkedValues, setCheckedValues] = useState<COLORS[]>([])

  const sendAnswerMutation = useSendAnswerMutation()

  return (
    <Box>
      Game
      <Text>Question: {currentRound.question.question}</Text>
      <Text>Create Time: {currentRound.createTime.toLocaleString()}</Text>
      <CheckboxGroup
        onChange={(value) => setCheckedValues(value as COLORS[])}
        value={checkedValues}
      >
        <Stack direction="column">
          {Object.keys(COLORS).map((key, idx) => (
            //console.log('k', key, Object.values(COLORS)[idx])
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
    </Box>
  )
}
export default PlayerAnswering
