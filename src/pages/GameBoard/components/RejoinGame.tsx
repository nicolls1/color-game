import { Button } from '@chakra-ui/button'
import { Stack, Text } from '@chakra-ui/layout'
import { MAX_PLAYERS } from 'ts/siteConstants'
import { Game } from 'types/game'

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
      p={5}
    >
      {game!.players.length >= MAX_PLAYERS && game.roundsCompleted === -1 ? (
        <Text>Game is full.</Text>
      ) : (
        <Text>Game has already started.</Text>
      )}
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
