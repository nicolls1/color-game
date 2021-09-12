import { Button } from '@chakra-ui/button'
import { useClipboard } from '@chakra-ui/hooks'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { Center, SimpleGrid, Stack, Text } from '@chakra-ui/layout'
import { useNextRoundMutation } from 'hooks/game'
import { MAX_PLAYERS } from 'ts/siteConstants'
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
      <Text textStyle="p">
        Waiting for people to join. Share the link below!
      </Text>
      <InputGroup maxW="xl">
        <Input pr="5.5rem" value={roomLocation} isReadOnly />
        <InputRightElement width="5.5rem">
          <Button h="1.75rem" size="sm" onClick={onCopy}>
            {hasCopied ? 'Copied' : 'Copy'}
          </Button>
        </InputRightElement>
      </InputGroup>
      <SimpleGrid columns={2} spacing={5} w="full" maxW="xl">
        {[...Array(MAX_PLAYERS).keys()].map((idx) => (
          <Center key={idx} boxShadow="base" w="full" h="80px" borderRadius={5}>
            {game!.players && idx < game!.players.length && (
              <Text textStyle="p">{game!.players[idx].name}</Text>
            )}
          </Center>
        ))}
      </SimpleGrid>

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
