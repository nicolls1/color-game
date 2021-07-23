import { Button } from '@chakra-ui/button'
import { useClipboard } from '@chakra-ui/hooks'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { Stack, Text } from '@chakra-ui/layout'
import { useNextRoundMutation } from 'hooks/game'
import { Game } from 'types/game'

interface Props {
  game: Game
}

const PlayersJoining: React.FC<Props> = ({ game }) => {
  const nextRoundMutation = useNextRoundMutation()
  const roomLocation = window.location.href
  const { hasCopied, onCopy } = useClipboard(roomLocation)
  return (
    <Stack
      direction="column"
      spacing={5}
      minH="100vh"
      justify="center"
      align="center"
      p={5}
    >
      <Text>Waiting for people to join. Share the link below!</Text>
      <InputGroup maxW="xl">
        <Input pr="5.5rem" value={roomLocation} isReadOnly />
        <InputRightElement width="5.5rem">
          <Button h="1.75rem" size="sm" onClick={onCopy}>
            {hasCopied ? 'Copied' : 'Copy'}
          </Button>
        </InputRightElement>
      </InputGroup>
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
