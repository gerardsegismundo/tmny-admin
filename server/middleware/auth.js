const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/keys')

const auth = async (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token')

  // Check of not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorized denied' })
  }

  // Verify token
  try {
    await jwt.verify(token, jwtSecret, (error, decoded) => {
      if (error) return res.status(401).json({ msg: 'Token is not valid..' })

      req.user = decoded.user
    })

    next()
  } catch (error) {
    console.error('Something wrong with auth middleware..')
    res.status(500).json({ msg: 'Server error..' })
  }
}

module.exports = auth
