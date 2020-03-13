import { combineReducers } from 'redux'

import ui from './ui/ui.reducer'
import auth from './auth/auth.reducer'
import messages from './messages/messages.reducer'
import posts from './posts/posts.reducer'

export default combineReducers({
  ui,
  auth,
  messages,
  posts
})
