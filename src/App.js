import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Nav from './components/Nav'
import Travels from './components/Travels'
import FortyK from './components/FortyK'

export default function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route path='/40k'>
            <FortyK />
          </Route>
          <Route path='/travels'>
            <Travels />
          </Route>
          <Route path='/'>
            <div>home</div>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}
