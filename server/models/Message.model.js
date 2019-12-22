const { model, Schema } = require('mongoose')

const MessageSchema = new Schema({
  displayName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  unread: {
    type: Boolean,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

model('message', MessageSchema)
