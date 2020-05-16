import React from 'react'
import { connect } from 'react-redux'

import { Route, Switch, Redirect } from 'react-router-dom'
import { Container } from '@material-ui/core'
import Navbar from '../components/Navbar'
import Posts from './Posts'
import Messages from './Messages'

const Dashboard = ({ currentUser }) => {
  return (
    currentUser && (
      <div className='dashboard'>
        <Navbar />
        <Redirect push to='/dashboard/messages' /> }
        <Container className='dashboard__container'>
          <Switch>
            <Route
              exact
              path='/dashboard/posts'
              render={() => <Posts />}
            ></Route>
            <Route
              exact
              path='/dashboard/messages'
              render={() => <Messages />}
            ></Route>
          </Switch>
        </Container>
      </div>
    )
  )
}

const mapStateToProps = ({ auth }) => ({
  currentUser: auth.currentUser
})

export default connect(mapStateToProps)(Dashboard)
