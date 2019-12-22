import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../redux/auth/auth.actions'
import Navbar from '../components/Navbar'

import { Route, Switch } from 'react-router-dom'
import Messages from './Dashboard/Messages'

// eslint-disable-next-line
import { Container } from '@material-ui/core'

const Dashboard = ({ currentUser, logout }) => {
  return (
    currentUser && (
      <div className='dashboard'>
        <Navbar />
        <Container className='dashboard__container'>
          <p>{currentUser.email}</p>
          {/* <Link to='/dashboard/messages'>MEssages</Link> */}
          <Switch>
            {/* <Route path={'/dashboard/messages'} component={Messages}></Route> */}
            <Route path={'/'} component={Messages}></Route>
          </Switch>
        </Container>
      </div>
    )
  )
}

const mapStateToProps = ({ auth }) => ({
  currentUser: auth.currentUser
})

export default connect(mapStateToProps, { logout })(Dashboard)
