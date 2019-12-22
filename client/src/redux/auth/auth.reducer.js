const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  currentUser: null,
  error: null
}

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'USER_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        currentUser: payload,
        loading: false
      }

    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', payload.token)

      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      }

    case 'REGISTER_FAIL':
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: payload
      }
    case 'AUTH_ERROR':
    case 'LOGIN_FAIL':
    case 'LOGOUT':
    case 'ACCOUNT_DELETED':
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: payload
      }

    default:
      return state
  }
}

export default authReducer
