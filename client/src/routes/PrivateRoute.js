import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated ? <Redirect to='/' /> : <Component {...props} />
    }
  />
)

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated
})

export default connect(mapStateToProps)(PrivateRoute)
