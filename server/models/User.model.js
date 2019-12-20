const { model, Schema } = require('mongoose')

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  avatar: {
    type: String
  },
  password: {
    type: String,
    required: true
  }
})

model('user', UserSchema)
