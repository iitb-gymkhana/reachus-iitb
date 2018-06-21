const Joi = require('joi')

const authenticateUserSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

module.exports = authenticateUserSchema