import { Button } from '@chakra-ui/button'
import {
  Box,
  Center,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
} from '@chakra-ui/layout'
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/progress'
import { useTheme } from '@chakra-ui/system'
import { useRoundTimeUsed, useSendAnswerMutation } from 'hooks/game'
import { useMemo, useState } from 'react'
import { COLORS_TO_THEME_KEY, ROUND_TIME } from 'ts/siteConstants'
import { COLORS, Game } from 'types/game'

interface Props {
  game: Game
  playerIndex: number
}

const PlayerAnswering: React.FC<Props> = ({ game, playerIndex }) => {
  const currentRound = game!.rounds[game!.roundsCompleted]
  const [checkedValues, setCheckedValues] = useState<COLORS[]>([])
  const sendAnswerMutation = useSendAnswerMutation()
  const timeUsed = useRoundTimeUsed(game)
  const theme = useTheme()
  const loadingColor = useMemo(() => {
    const spinnerColors = Object.keys(theme.colors.selectionColors)
    return `selectionColors.${
      spinnerColors[
        spinnerColors.length % game.roundsCompleted || spinnerColors.length - 1
      ]
    }`
  }, [game.roundsCompleted, theme])

  const onColorClicked = (color: COLORS) => {
    if (checkedValues.includes(color)) {
      setCheckedValues(checkedValues.filter((value) => value !== color))
    } else {
      if (checkedValues.length === currentRound.question.answer.length) {
        return
      }
      setCheckedValues([...checkedValues, color])
    }
  }

  return (
    <Stack
      direction="column"
      spacing={10}
      minH="100vh"
      justify="center"
      align="center"
      p={5}
      maxW="2xl"
      mx="auto"
    >
      <Flex direction="row" justify="space-between" w="full">
        <Stack direction="column" spacing={5}>
          <Heading size="sm">
            {currentRound.question.question}{' '}
            <Box as="span" color="orange.500">
              ({currentRound.question.answer.length})
            </Box>
          </Heading>
          <Stack direction="row" spacing={5} justify="center">
            {[...Array(currentRound.question.answer.length).keys()].map(
              (idx) => (
                <Center
                  key={idx}
                  borderRadius="full"
                  h={10}
                  w={10}
                  bgColor={
                    idx < checkedValues.length
                      ? COLORS_TO_THEME_KEY[checkedValues[idx]]
                      : 'gray.300'
                  }
                  color="white"
                  boxShadow="dark-lg"
                >
                  {idx >= checkedValues.length && '?'}
                </Center>
              )
            )}
          </Stack>
        </Stack>
        <CircularProgress
          max={ROUND_TIME}
          min={0}
          value={timeUsed}
          color={loadingColor}
          h="full"
          size="80px"
          alignSelf="center"
        >
          <CircularProgressLabel color="gray.500">
            {ROUND_TIME - timeUsed}
          </CircularProgressLabel>
        </CircularProgress>
      </Flex>
      <SimpleGrid columns={{ base: 2, md: 4 }} w="full" spacing={5}>
        {Object.keys(COLORS).map((key, idx) => (
          <Center
            key={key}
            value={key.toLowerCase()}
            h={20}
            bgColor={COLORS_TO_THEME_KEY[key.toLowerCase() as COLORS]}
            boxShadow="lg"
            borderRadius={5}
            color={
              ['white', 'yellow'].includes(key.toLowerCase())
                ? 'gray.500'
                : 'white'
            }
            cursor="pointer"
            _hover={{
              boxShadow: 'outline',
            }}
            border={
              checkedValues.includes(key.toLowerCase() as COLORS)
                ? `4px solid`
                : 'none'
            }
            borderColor="green.500"
            onClick={() => onColorClicked(key.toLowerCase() as COLORS)}
          >
            {key.toLowerCase()}
          </Center>
        ))}
      </SimpleGrid>
      <Button
        onClick={() =>
          checkedValues.length === currentRound.question.answer.length &&
          sendAnswerMutation.mutate({
            game,
            playerIndex,
            answer: checkedValues,
          })
        }
      >
        Submit
      </Button>
    </Stack>
  )
}
export default PlayerAnswering
