const { connect } = require('mongoose')
const { mongoURI } = require('./keys')

const dbConfig = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}

connect(mongoURI, dbConfig)
