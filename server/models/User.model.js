const { model, Schema } = require('mongoose')

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  avatar: {
    type: String
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
})

model('user', UserSchema)
