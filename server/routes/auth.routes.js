const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/keys')
const auth = require('../middleware/auth')

const { model } = require('mongoose')
const User = model('user')
const { validateUser } = require('../validations/validateUser')
const { formatErrMsg } = require('../helpers')

// @route    GET api/auth
// @desc     Load user
// @access   Public
router.get('/', auth, async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(400).json({ error: { msg: 'User id error..' } })
  }

  const user = await User.findById(req.user.id).select('-password')
  if (!user) return res.status(500).json({ error: { msg: 'Server error..' } })

  res.json(user)
})

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post('/', async (req, res) => {
  const { error } = validateUser(req.body)

  if (error) {
    const msg = formatErrMsg(error.details[0].message)

    return res
      .status(400)
      .json({ error: { keys: [error.details[0].context.key], msg } })
  }

  const { email, password } = req.body

  try {
    let user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({
        error: { keys: ['email', 'password'], msg: 'Invalid credentials.' }
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      console.log('invalid credentials 2')
      return res.status(400).json({
        error: { keys: ['email', 'password'], msg: 'Invalid credentials.' }
      })
    }

    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err
      res.json({ token })
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ error: { msg: 'Server error..' } })
  }
})

module.exports = router
