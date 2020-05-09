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
  // IMAGEURL INSTEAD OF FILE
  // if (!req.files) {
  console.log('BIWSHIT')
  console.log(req.body)
  const { title, hashtags, body, imgURL } = req.body

  //   const post = Post.findOne({ title })
  //   if (post) return res.status(400).send('Title already exists.')

  const newPost = new Post({
    title,
    hashtags,
    body,
    imgURL
  })

  await newPost.save()

  res.send(newPost)
  //   // return res.status(400).json({ msg: 'No file uploaded' })
  // } else {
  //   console.log('TAES')
  //   console.log(req.body)
  //   res.send(req.body)
  // }
  // const gfs = getGfs(req.db)

  // const file = req.files.file

  // res.json({ file: file, details: req.body.details })
})

module.exports = router
