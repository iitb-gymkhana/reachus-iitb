const Joi = require('joi')

const createCategorySchema = Joi.object().keys({
    uniqueIdentifier: Joi.string().required(),
    name: Joi.string().required()
})

module.exports = createCategorySchema