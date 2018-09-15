const Joi = require('joi')

const authenticateUserSchema = Joi.object().keys({
    code: Joi.string().required()
})

module.exports = authenticateUserSchema