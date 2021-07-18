import { Button } from '@chakra-ui/button'
import { Stack, Text } from '@chakra-ui/layout'

import { useResetGameMutation } from 'hooks/Game'
import { Game } from 'types/Game'

interface Props {
  game: Game
}

const GameOver: React.FC<Props> = ({ game }) => {
  const resetGameMutation = useResetGameMutation()
  const places = game.players.sort((a, b) => b.points - a.points)

  return (
    <Stack direction="column" justify="center" align="center" h="100vh">
      <Text>The winner is: </Text>
      {places.map((player, idx) => (
        <Text key={idx}>
          {idx + 1} {player.name}: {player.points}
        </Text>
      ))}
      <Button
        w="fit-content"
        onClick={() => resetGameMutation.mutate({ game })}
        isLoading={resetGameMutation.isLoading}
      >
        New Game
      </Button>
    </Stack>
  )
}
export default GameOver
