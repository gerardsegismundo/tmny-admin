const express = require('express')
const app = express()
const path = require('path')

// Database connection
require('./config/db')

// Routes
require('./config/routes')(app)

// Production config
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
}

// Port
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Running on port ${PORT}...`))
