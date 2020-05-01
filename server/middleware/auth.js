const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/keys')

const auth = async (req, res, next) => {
  const token = req.header('x-auth-token')
  // if (!token) throw new Error()

  if (!token) {
    console.log('No token provided')
    return res.status(401).send({ error: 'Please authenticate.' })
  }

  try {
    const decoded = jwt.verify(token, jwtSecret)
    if (!decoded.user) throw new Error()

    req.user = decoded.user

    next()
  } catch (err) {
    console.error(err)
    res.status(401).send({ error: 'Please authenticate.' })
  }
}

module.exports = auth
