const Joi = require('joi')

module.exports = Joi.object().keys({
    from: Joi.date().required(),
    to: Joi.date().required(),
    room: Joi.string().required()
})