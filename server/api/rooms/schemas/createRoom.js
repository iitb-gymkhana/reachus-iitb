const Joi = require('joi')

const createRoomSchema = Joi.object().keys({
    number: Joi.string().required(),
    name: Joi.string().required()
})

module.exports = createRoomSchema