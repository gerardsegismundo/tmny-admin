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
})

router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params

  const post = await Post.findByIdAndRemove(req.params.id)

  if (!post) {
    return res.status(404).send('The post with the given ID was not found.')
  }

  res.send({ id })
})

module.exports = router
