import { Button } from '@chakra-ui/button'
import { Stack, Text } from '@chakra-ui/layout'
import { useNextRoundMutation } from 'hooks/Game'
import { Game } from 'types/Game'

interface Props {
  game: Game
}

const PlayersJoining: React.FC<Props> = ({ game }) => {
  const nextRoundMutation = useNextRoundMutation()
  return (
    <Stack direction="column" spacing={5}>
      <Text>Waiting for people to join...</Text>
      <Text>Current Players:</Text>
      {game!.players &&
        game!.players.map((player, idx) => (
          <Text key={`${idx}${player.name}`}>{player.name}</Text>
        ))}
      <Button
        w="fit-content"
        onClick={() => nextRoundMutation.mutate({ game })}
        isDisabled={game.players.length === 1}
      >
        Start Game
      </Button>
    </Stack>
  )
}
export default PlayersJoining
