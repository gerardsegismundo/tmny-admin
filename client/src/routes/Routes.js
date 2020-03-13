import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'

import PrivateRoute from './PrivateRoute'

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/' component={Login} />
      <Route
        exact
        // path='/'
        path='/create-account'
        render={routeProps => <Register {...routeProps} />}
      />
      <PrivateRoute path='/dashboard' component={Dashboard} />
      <Route path='*' exact={true} component={NotFound} />
    </Switch>
  )
}

export default Routes
