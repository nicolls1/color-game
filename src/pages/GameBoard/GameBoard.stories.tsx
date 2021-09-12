import { ComponentMeta } from '@storybook/react'
import GameBoard from 'pages/GameBoard/GameBoard'
import { generatePath, useHistory } from 'react-router'
import { ROUTES } from 'ts/siteConstants'

export default {
  title: 'Page/GameBoard',
  component: GameBoard,
} as ComponentMeta<typeof GameBoard>

export const NoPlayersJoined = () => <GameBoard />

export const OnePlayerJoined = () => {
  const history = useHistory()
  history.replace(generatePath(ROUTES.games, { id: 'one-player-joined' }))
  return <GameBoard />
}

export const PlayerJoined = () => {
  const history = useHistory()
  history.replace(generatePath(ROUTES.games, { id: 'one-player-joined' }))
  return <GameBoard initialState={{ playerIndex: 1 }} />
}

export const GameFull = () => {
  const history = useHistory()
  history.replace(generatePath(ROUTES.games, { id: 'game-full' }))
  return <GameBoard />
}

export const PlayerRejoining = () => {
  const history = useHistory()
  history.replace(generatePath(ROUTES.games, { id: 'player-rejoining' }))
  return <GameBoard />
}

export const PlayerAnswering = () => {
  const history = useHistory()
  history.replace(generatePath(ROUTES.games, { id: 'player-answering' }))
  return <GameBoard initialState={{ playerIndex: 0 }} />
}

export const WaitingForOtherAnswers = () => {
  const history = useHistory()
  history.replace(
    generatePath(ROUTES.games, { id: 'waiting-for-other-answers' })
  )
  return <GameBoard initialState={{ playerIndex: 0 }} />
}

export const RoundOver = () => {
  const history = useHistory()
  history.replace(generatePath(ROUTES.games, { id: 'round-over' }))
  return <GameBoard initialState={{ playerIndex: 0 }} />
}

export const GameOver = () => {
  const history = useHistory()
  history.replace(generatePath(ROUTES.games, { id: 'game-over' }))
  return <GameBoard />
}
