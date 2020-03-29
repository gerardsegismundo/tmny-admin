const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const { model } = require('mongoose')
const Post = model('post')

router.get('/', auth, async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(400).json({ error: { msg: 'User id error..' } })
  }

  const posts = await Post.find().sort({ date: -1 })
  if (!posts) return res.status(400).send('Failed loading posts')

  res.json(posts)
})

module.exports = router
