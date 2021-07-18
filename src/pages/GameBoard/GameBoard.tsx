import { useState } from 'react'
import { Center } from '@chakra-ui/layout'
import { useHistory, useRouteMatch } from 'react-router'

import { useGame } from 'hooks/Game'
import { ROUTES } from 'siteConstants'
import { Game } from 'types/Game'
import PlayersJoining from './components/PlayersJoining'
import PlayerAnswering from './components/PlayerAnswering'
import WaitingForOthers from './components/WaitingForOthers'
import RoundEnd from './components/RoundEnd'
import GameOver from './components/GameOver'
import RejoinGame from './components/RejoinGame'
import { CircularProgress } from '@chakra-ui/progress'
import PlayerNameInput from './components/PlayerNameInput'

const MAX_PLAYERS = 4
const POINTS_NEEDED_TO_WIN: Record<number, number> = {
  2: 10,
  3: 15,
  4: 15,
  5: 20,
  6: 20,
  7: 25,
  8: 25,
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

  if (isLoadingGame) {
    return (
      <Center h="100vh">
        <CircularProgress isIndeterminate />
      </Center>
    )
  }

  if (
    game &&
    Math.max(...Object.values(game.players).map((player) => player.points)) >=
      POINTS_NEEDED_TO_WIN[game.players.length]
  ) {
    return <GameOver game={game} />
  }

  if ((game === undefined && !isLoadingGame) || (game && playerIndex === -1)) {
    if (game && game!.roundsCompleted >= 0 && playerIndex === -1) {
      return (
        <RejoinGame
          game={game}
          onSetPlayer={(index) => setPlayerIndex(index)}
        />
      )
    }
    if (game && game!.players.length >= MAX_PLAYERS) {
      return <Center h="100vh">Game is full</Center>
    }
    return (
      <PlayerNameInput
        gameId={gameId as string}
        game={game}
        onSetPlayer={(index) => setPlayerIndex(index)}
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
