import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'

// Load user
export const loadUser = () => async dispatch => {
  if (localStorage.token) setAuthToken(localStorage.token)

  try {
    const res = await axios.get('/api/auth')

    dispatch({ type: 'USER_LOADED', payload: res.data })
  } catch (err) {
    dispatch({ type: 'AUTH_ERROR' })
  }
}

// Create accout
export const register = (
  email,
  password,
  history,
  callback
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ email, password })

  try {
    const res = await axios.post('/api/users', body, config)

    dispatch({
      type: 'REGISTER_SUCCESS',
      payload: res.data
    })

    callback()
  } catch (err) {
    const { error } = err.response.data

    dispatch({
      type: 'REGISTER_FAIL',
      payload: error
    })
  }
}

// Login user
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ email, password })

  try {
    const res = await axios.post('/api/auth', body, config)

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: res.data
    })

    dispatch(loadUser())
  } catch (err) {
    const { error } = err.response.data

    dispatch({
      type: 'LOGIN_FAIL',
      payload: error
    })
  }
}

// Logout user & clear profile
export const logout = () => dispatch => {
  dispatch({ type: 'CLEAR PROFILE' })
  dispatch({ type: 'LOGOUT' })
}
