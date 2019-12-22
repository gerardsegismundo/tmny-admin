const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')

const { model } = require('mongoose')
const Message = model('message')

// @route    GET api/messages
// @desc     Load messages
// @access   Private
router.get('/', auth, async (req, res) => {
  const messages = await Message.find().sort({ date: -1 })
  if (!messages) {
    return res.status(400).json({ error: 'Failed loading posts...' })
  }

  res.json(messages)
})

// @route    DELETE api/messages
// @desc     Delete message
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  const message = await Message.findByIdAndRemove(req.params.id)

  if (!message) {
    return res
      .status(404)
      .json({ error: 'The customer with the given ID was not found.' })
  }

  res.json(message)
})

module.exports = router
