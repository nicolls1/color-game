import { Button } from '@chakra-ui/button'
import { Stack, Text } from '@chakra-ui/layout'
import { Game } from 'types/Game'

interface Props {
  game: Game
  onSetPlayer: (index: number) => void
}

const RejoinGame: React.FC<Props> = ({ game, onSetPlayer }) => {
  return (
    <Stack
      direction="column"
      stack={5}
      justify="cneter"
      align="center"
      h="100vh"
    >
      <Text>Game has already started</Text>
      <Text>Rejoin as:</Text>
      {game.players.map((player, idx) => (
        <Button
          key={`${player.name}${idx}`}
          variant="link"
          w="fit-content"
          onClick={() => onSetPlayer(idx)}
        >
          {player.name}
        </Button>
      ))}
    </Stack>
  )
}
export default RejoinGame
