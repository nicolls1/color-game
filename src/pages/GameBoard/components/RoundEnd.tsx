import { Button } from '@chakra-ui/button'
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { Stack, Text } from '@chakra-ui/layout'
import { useNextRoundMutation } from 'hooks/Game'
import { answersMatch } from 'ts/utils'

import { Game } from 'types/Game'

interface Props {
  game: Game
}

const RoundEnd: React.FC<Props> = ({ game }) => {
  const nextRoundMutation = useNextRoundMutation()
  return (
    <Stack diretion="column" justify="center" align="center" h="100vh">
      <Text>Round Finished.</Text>
      <Text>Player Answers:</Text>
      {game.players.map((player, idx) => (
        <Stack key={`${player.name}${idx}`} direction="row" align="center">
          {answersMatch(
            game.rounds[game.roundsCompleted - 1].answers[idx],
            game.rounds[game.roundsCompleted - 1].question.answer
          ) ? (
            <CheckIcon />
          ) : (
            <CloseIcon />
          )}
          <Text>
            {player.name}:{' '}
            {game.rounds[game.roundsCompleted - 1].answers[idx]
              ? game.rounds[game.roundsCompleted - 1].answers[idx].join(', ')
              : '-'}
          </Text>
        </Stack>
      ))}

      <Text>Current Scores:</Text>
      {game.players.map((player, idx) => (
        <Text key={`${player.name}${idx}`}>
          {player.name}: {player.points}
        </Text>
      ))}
      <Button
        w="fit-content"
        onClick={() => nextRoundMutation.mutate({ game })}
      >
        Next Round
      </Button>
    </Stack>
  )
}
export default RoundEnd
