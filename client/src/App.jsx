import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import Routes from './routes/Routes'
import store from './redux/store'
import setAuthToken from './utils/setAuthToken'
import { loadUser } from './redux/auth/auth.actions'
import { NotificationContainer } from 'react-notifications'

if (localStorage.token) setAuthToken(localStorage.token)

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

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
