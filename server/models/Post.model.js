const { model, Schema } = require('mongoose')
const Joi = require('joi')

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    hashtags: Array,
    likes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'User'
        }
      }
    ],
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'User'
        },
        text: {
          type: String,
          required: true
        },
        name: {
          type: String
        },
        avatar: {
          type: String
        },
        date: {
          type: Date,
          default: Date.now
        }
      }
    ],
    date: {
      type: Date,
      default: Date.now
    }
  }
  // {
  //   timestamps: true
  // }
)

const validatePost = post => {
  const schema = {
    title: Joi.string().min(3).max(50).required(),
    avatar: Joi.string().uri({
      scheme: [/https?/]
    }),
    text: Joi.string().min(3).required()
  }

  return Joi.validate(post, schema)
}

model('post', PostSchema)
exports.validate = validatePost
