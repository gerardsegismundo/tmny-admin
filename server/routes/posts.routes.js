const express = require('express')
const router = express.Router()

// Middleware && helpers
const { uploadImage, auth } = require('../middleware')
const { getGfs } = require('../helpers')

// POST model
const { model } = require('mongoose')
const Post = model('post')

// Load Posts
router.get('/', auth, async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(400).json({ error: { msg: 'User id error..' } })
  }

  const posts = await Post.find().sort({ date: -1 })
  if (!posts) return res.status(400).send('Failed loading posts')

  res.json(posts)
})

// Create Post
router.post('/', auth, uploadImage, async (req, res) => {
  console.log('AFTER UPLOAD FILENAME:', req.filename)

  console.log(req.files.imgFile)
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' })
  }

  const gfs = getGfs(req.db)

  const file = req.files.file

  res.json({ file: file, details: req.body.details })
})

module.exports = router
