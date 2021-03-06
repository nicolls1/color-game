import { Switch, Route, Redirect } from 'react-router-dom'

import { ROUTES } from 'ts/siteConstants'
import GameBoard from 'pages/GameBoard/GameBoard'
import Home from 'pages/Home/Home'

function App() {
  return (
    <Switch>
      <Route exact path={ROUTES.games}>
        <GameBoard />
      </Route>
      <Route exact path={ROUTES.home}>
        <Home currentPage={window.location.href} />
      </Route>
      <Route path="*">
        <Redirect to={ROUTES.home} />
      </Route>
    </Switch>
  )
}

export default App
