import React from 'react'

import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'

import { NotificationContainer } from 'react-notifications'

import Routes from './routes/Routes'

const App = () => {
  return (
    <>
      <NotificationContainer />
      <Router>
        <Switch>
          <Route component={Routes} />
        </Switch>
      </Router>
    </>
  )
}

export default App
