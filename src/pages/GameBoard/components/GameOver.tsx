import { Button } from '@chakra-ui/button'
import { Box, Flex, Heading, Spacer, Stack, Text } from '@chakra-ui/layout'

import { useResetGameMutation } from 'hooks/game'
import { Game } from 'types/game'

interface Props {
  game: Game
}

const GameOver: React.FC<Props> = ({ game }) => {
  const resetGameMutation = useResetGameMutation()
  const places = game.players.sort((a, b) => b.points - a.points)

  return (
    <Stack
      direction="column"
      spacing={10}
      justify="center"
      align="center"
      h="100vh"
      p={5}
      maxW="xl"
      mx="auto"
    >
      <Box>
        <Heading size="xl">Final Score</Heading>
        <Box bgColor="lightBlue.500" borderRadius="full" h={3} w="full" />
      </Box>

      <Stack
        direction="column"
        spacing={5}
        p={10}
        bgColor="orange.50"
        w="full"
        borderRadius={5}
      >
        {places.map((player, idx) => (
          <Flex key={idx} w="full">
            <Text textStyle="p">
              <b>{idx + 1}.</b> {player.name}
            </Text>
            <Spacer borderBottom="1px dotted black" mx={2} />
            <Text textStyle="p">{player.points}</Text>
          </Flex>
        ))}
      </Stack>

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
