import { useState } from 'react'
import { Box, Heading, Stack, Text } from '@chakra-ui/layout'
import { useHistory, useRouteMatch } from 'react-router'
import { Input } from '@chakra-ui/input'
import { Button } from '@chakra-ui/button'

import { useGame, useJoinGameMutation, useCreateGameMutation } from 'hooks/Game'
import { ROUTES } from 'siteConstants'
import { Game } from 'types/Game'
import PlayersJoining from './components/PlayersJoining'
import PlayerAnswering from './components/PlayerAnswering'
import WaitingForOthers from './components/WaitingForOthers'
import RoundEnd from './components/RoundEnd'
import GameOver from './components/GameOver'

interface PlayerNameInputScreenProps {
  gameId: string
  game?: Game
  onPlayerIndex: (index: number) => void
}

const PlayerNameInputScreen: React.FC<PlayerNameInputScreenProps> = ({
  gameId,
  game,
  onPlayerIndex,
}) => {
  const [name, setName] = useState('')

  const createGameMutation = useCreateGameMutation()
  const joinGameMutation = useJoinGameMutation()

  return (
    <Stack direction="column" h="100vh" m={5} justify="center" align="center">
      <Heading size="md">Player Name</Heading>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        maxW="400px"
      />
      <Button
        onClick={async () => {
          if (game === undefined) {
            await createGameMutation.mutateAsync({
              gameId: gameId,
              playerName: name,
            })
            onPlayerIndex(0)
          } else {
            onPlayerIndex(
              await joinGameMutation.mutateAsync({
                game: game as Game,
                playerName: name,
              })
            )
          }
        }}
      >
        Join Game
      </Button>
    </Stack>
  )
}

const GameBoard: React.FC = () => {
  const history = useHistory()
  const match = useRouteMatch<{ id: string }>(ROUTES.games)
  const gameId = match?.params.id
  const [playerIndex, setPlayerIndex] = useState(-1)
  if (!match) {
    history.replace(ROUTES.home)
  }
  const { data: game, isLoading: isLoadingGame } = useGame(gameId)

  console.log('game', game, playerIndex)

  if (isLoadingGame) {
    return <Box>loading...</Box>
  }

  if (
    game &&
    Math.max(...Object.values(game.players).map((player) => player.points)) >=
      (game.players.length === 2 ? 10 : 15)
  ) {
    return <GameOver game={game} />
  }

  if ((game === undefined && !isLoadingGame) || (game && playerIndex === -1)) {
    if (game && game!.roundsCompleted >= 0 && playerIndex === -1) {
      return (
        <Stack direction="column" stack={5}>
          <Text>Game has already started</Text>
          <Text>Rejoin as:</Text>
          {game.players.map((player, idx) => (
            <Button
              key={`${player.name}${idx}`}
              variant="link"
              w="fit-content"
              onClick={() => setPlayerIndex(idx)}
            >
              {player.name}
            </Button>
          ))}
        </Stack>
      )
    }
    if (game && game!.players.length >= 4) {
      return <Box>Game is full</Box>
    }
    return (
      <PlayerNameInputScreen
        gameId={gameId as string}
        game={game}
        onPlayerIndex={(index) => setPlayerIndex(index)}
      />
    )
  }
  if (game!.roundsCompleted === -1) {
    return <PlayersJoining game={game as Game} />
  }
  if (game!.roundsCompleted === game!.rounds.length) {
    return <RoundEnd game={game as Game} />
  }
  const currentRound = game!.rounds[game!.roundsCompleted]
  if (playerIndex in currentRound.answers) {
    return <WaitingForOthers game={game as Game} />
  }

  return <PlayerAnswering game={game as Game} playerIndex={playerIndex} />
}
export default GameBoard
