const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { model } = require('mongoose')
const User = model('user')

const { jwtSecret } = require('../config/keys')
const { validateUser } = require('../validations/validateUser')
const { formatErrMsg } = require('../helpers/utils')

// @route   POST api/users
// @desc    Create account
// @access  Public
router.post('/', async (req, res) => {
  // Joi validation
  const { error } = validateUser(req.body)
  if (error) {
    const msg = formatErrMsg(error.details[0].message)

    return res
      .status(400)
      .json({ error: { keys: [error.details[0].context.key], msg } })
  }

  const { email, password } = req.body

  // If user exists
  let user = await User.findOne({ email })
  if (user) {
    return res
      .status(400)
      .json({ error: { keys: ['email'], msg: 'Email already exists.' } })
  }

  const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mn' })

  user = new User({
    email,
    avatar,
    password
  })

  const salt = await bcrypt.genSalt(10)

  user.password = await bcrypt.hash(password, salt)

  await user.save()

  const payload = {
    user: {
      id: user.id
    }
  }

  jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
    if (err) throw err

    res.json({ token })
  })
})

module.exports = router
