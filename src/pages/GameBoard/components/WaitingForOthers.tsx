import { Stack, Text } from '@chakra-ui/layout'
import { useEndRoundMutation, useRoundTimeUsed } from 'hooks/Game'
import { useEffect, useState } from 'react'

import { Game } from 'types/Game'

interface Props {
  game: Game
}

const WaitingForOthers: React.FC<Props> = ({ game }) => {
  const currentRound = game!.rounds[game!.roundsCompleted]
  const endRoundMutation = useEndRoundMutation()
  const [hasEndedRound, setHasEndedRound] = useState(false)
  useRoundTimeUsed(game)

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
    >
      <Text>Waiting for others</Text>
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
