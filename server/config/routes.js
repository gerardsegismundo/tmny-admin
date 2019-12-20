const express = require('express')
require('express-async-errors')

// Models
// require('../models/Auth.model')
require('../models/User.model')

// Routes
const authRoute = require('../routes/auth.routes')
const usersRoute = require('../routes/users.routes')

module.exports = app => {
  app.use(express.json())
  app.use('/api/auth', authRoute)
  app.use('/api/users', usersRoute)
}
