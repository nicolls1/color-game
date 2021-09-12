import { Button } from '@chakra-ui/button'
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import {
  Box,
  Center,
  Divider,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/layout'
import { useNextRoundMutation } from 'hooks/game'
import { Fragment } from 'react'
import { COLORS_TO_THEME_KEY } from 'ts/siteConstants'
import { answersMatch, calculateNewPoints } from 'ts/utils'

import { Game } from 'types/game'

interface Props {
  game: Game
}

const RoundEnd: React.FC<Props> = ({ game }) => {
  const currentRound = game!.rounds[game!.roundsCompleted - 1]
  const nextRoundMutation = useNextRoundMutation()
  const newPoints = calculateNewPoints(
    game.players.length,
    game.rounds[game.roundsCompleted - 1].question.answer,
    game.rounds[game.roundsCompleted - 1].answers
  )
  return (
    <Stack
      direction="column"
      spacing={10}
      justify="center"
      align="center"
      h="100vh"
      p={5}
      maxW="2xl"
      mx="auto"
    >
      <Stack direction="column" spacing={5}>
        <Heading size="sm">
          {currentRound.question.question}{' '}
          <Box as="span" color="orange.500">
            ({currentRound.question.answer.length})
          </Box>
        </Heading>

        <Stack direction="row" spacing={5} justify="center">
          {currentRound.question.answer.map((answer) => (
            <Center
              key={answer}
              borderRadius="full"
              h={10}
              w={10}
              bgColor={COLORS_TO_THEME_KEY[answer]}
              color="white"
              boxShadow="dark-lg"
            />
          ))}
        </Stack>
      </Stack>

      <Box py={5} bgColor="orange.50" w="full" borderRadius={5}>
        <SimpleGrid
          columns={5}
          direction="row"
          align="center"
          w="full"
          spacing={5}
        >
          <Text textStyle="p">Player</Text>
          <Text textStyle="p">Answer</Text>
          <Text textStyle="p">Correct</Text>
          <Text textStyle="p">Points</Text>
          <Text textStyle="p">Score</Text>
        </SimpleGrid>
        <Divider w="full" color="gray.50" mt={2} mb={5} />

        <SimpleGrid
          columns={5}
          direction="row"
          align="center"
          w="full"
          spacing={5}
        >
          {game.players.map((player, idx) => (
            <Fragment key={`${player.name}${idx}`}>
              <Text textStyle="p">{player.name}</Text>
              <Stack direction="row" spacing={2} justify="center">
                {game.rounds[game.roundsCompleted - 1].answers[idx] !==
                undefined ? (
                  game.rounds[game.roundsCompleted - 1].answers[idx].map(
                    (answer) => (
                      <Center
                        key={answer}
                        borderRadius="full"
                        h={5}
                        w={5}
                        bgColor={COLORS_TO_THEME_KEY[answer]}
                        color="white"
                        boxShadow="dark-lg"
                      />
                    )
                  )
                ) : (
                  <Text textStyle="p">-</Text>
                )}
              </Stack>
              {answersMatch(
                game.rounds[game.roundsCompleted - 1].answers[idx],
                game.rounds[game.roundsCompleted - 1].question.answer
              ) ? (
                <CheckIcon color="green.500" />
              ) : (
                <CloseIcon color="red.500" />
              )}
              <Text textStyle="p">{`${newPoints[idx] > 0 ? '+' : ''}${
                newPoints[idx]
              }`}</Text>
              <Text textStyle="p">{player.points}</Text>
            </Fragment>
          ))}
        </SimpleGrid>
      </Box>

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
