const Joi = require('joi')

const validateUser = req => {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(100)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .max(100)
      .required()
  }

  return Joi.validate(req, schema)
}

exports.validateUser = validateUser
