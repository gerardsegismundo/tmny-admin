const path = require('path')
const crypto = require('crypto')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const { mongoURI } = require('../config/keys')

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  options: { useUnifiedTopology: true },
  file: (req, file) => {
    console.log('STORAGE!!!')
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) return reject(err)

        const filename = buf.toString('hex') + path.extname(file.originalname)
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        }

        console.log('STORAGE FILENAME:', filename)
        req.filename = filename
        resolve(fileInfo)
      })
    })
  }
})

const uploadImage = multer({ storage }).single('imgFile')

module.exports = uploadImage
