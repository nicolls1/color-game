import { Stack, Text } from '@chakra-ui/layout'
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/progress'
import { useEndRoundMutation, useRoundTimeUsed } from 'hooks/game'
import { useEffect, useState } from 'react'
import { ROUND_TIME } from 'ts/siteConstants'

import { Game } from 'types/game'

interface Props {
  game: Game
}

const WaitingForOthers: React.FC<Props> = ({ game }) => {
  const currentRound = game!.rounds[game!.roundsCompleted]
  const endRoundMutation = useEndRoundMutation()
  const [hasEndedRound, setHasEndedRound] = useState(false)
  const timeUsed = useRoundTimeUsed(game)

  useEffect(() => {
    if (
      game!.players.length === Object.keys(currentRound.answers).length &&
      !hasEndedRound
    ) {
      setHasEndedRound(true)
      endRoundMutation.mutate({ game })
    }
  }, [game, currentRound, endRoundMutation, hasEndedRound])

  return (
    <Stack
      direction="column"
      spacing={5}
      justify="center"
      align="center"
      minH="100vh"
      p={5}
    >
      <Text>Waiting for others</Text>
      <CircularProgress max={ROUND_TIME} min={0} value={timeUsed}>
        <CircularProgressLabel>{ROUND_TIME - timeUsed}</CircularProgressLabel>
      </CircularProgress>
      <Text>Has answered:</Text>
      {Object.keys(currentRound.answers).map((submittedIndexes) => (
        <Text key={submittedIndexes}>
          {game!.players[submittedIndexes as unknown as number].name}
        </Text>
      ))}
    </Stack>
  )
}
export default WaitingForOthers
