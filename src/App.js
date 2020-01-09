import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Nav from './components/Nav'
import Roster from './components/Roster'

export default function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route path='/40k'>
            <Roster />
          </Route>
          <Route path='/'>
            <div>home</div>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}
