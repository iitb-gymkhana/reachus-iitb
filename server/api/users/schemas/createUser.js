const Joi = require('joi');

const createUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required()
})

module.exports = createUserSchema;