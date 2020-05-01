const mongo = require('mongodb')
const Grid = require('gridfs-stream')

let gfsCache

// Init stream
const initStream = db => {
  let _gfs

  _gfs = Grid(db, mongo)
  _gfs.collection('uploads')

  return _gfs
}

// If no gfs cache generate gfs
const getGfs = db => (!gfsCache ? (gfsCache = initStream(db)) : gfsCache)

module.exports = getGfs
