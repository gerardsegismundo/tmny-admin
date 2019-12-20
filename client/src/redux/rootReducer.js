import { combineReducers } from 'redux'

import ui from './ui/ui.reducer'
import auth from './auth/auth.reducer'

export default combineReducers({
  ui,
  auth
})
