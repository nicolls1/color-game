import { Center, SimpleGrid, Stack, Text } from '@chakra-ui/layout'
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/progress'
import { useTheme } from '@chakra-ui/system'
import { useEndRoundMutation, useRoundTimeUsed } from 'hooks/game'
import { useEffect, useMemo, useState } from 'react'
import { ROUND_TIME } from 'ts/siteConstants'

import { Game } from 'types/game'

interface Props {
  game: Game
}

const WaitingForOthers: React.FC<Props> = ({ game }) => {
  const currentRound = game!.rounds[game!.roundsCompleted]
  const endRoundMutation = useEndRoundMutation()
  const [hasEndedRound, setHasEndedRound] = useState(false)
  const timeUsed = useRoundTimeUsed(game)

  useEffect(() => {
    if (
      game!.players.length === Object.keys(currentRound.answers).length &&
      !hasEndedRound
    ) {
      setHasEndedRound(true)
      endRoundMutation.mutate({ game })
    }
  }, [game, currentRound, endRoundMutation, hasEndedRound])

  const theme = useTheme()
  const loadingColor = useMemo(() => {
    const spinnerColors = Object.keys(theme.colors.selectionColors)
    return `selectionColors.${
      spinnerColors[
        spinnerColors.length % game.roundsCompleted || spinnerColors.length - 1
      ]
    }`
  }, [game.roundsCompleted, theme])
  console.log('a', Object.keys(currentRound.answers))

  return (
    <Stack
      direction="column"
      spacing={10}
      justify="center"
      align="center"
      minH="100vh"
      p={5}
    >
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
      <SimpleGrid columns={2} spacing={5} w="full" maxW="xl">
        {[...Array(game!.players.length).keys()].map((idx) => (
          <Center
            key={idx}
            boxShadow="base"
            w="full"
            h="80px"
            bgColor={
              Object.keys(currentRound.answers).includes(idx.toString())
                ? 'green.100'
                : 'red.100'
            }
            borderRadius={5}
          >
            <Text textStyle="p">{game!.players[idx].name}</Text>
          </Center>
        ))}
      </SimpleGrid>
    </Stack>
  )
}
export default WaitingForOthers
