const express = require('express')
require('express-async-errors')

// Models
require('../models/User.model')
require('../models/Message.model')
require('../models/Post.model')

// Routes
const authRoute = require('../routes/auth.routes')
const usersRoute = require('../routes/users.routes')
const messagesRoute = require('../routes/messages.routes')
const postRoute = require('../routes/posts.routes')

module.exports = app => {
  app.use(express.json())
  app.use('/api/auth', authRoute)
  app.use('/api/users', usersRoute)
  app.use('/api/messages', messagesRoute)
  app.use('/api/posts', postRoute)
}
