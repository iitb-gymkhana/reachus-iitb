const Joi = require('joi')

const createCategorySchema = Joi.object().keys({
    uniqueIdentifier: Joi.string().required(),
    name: Joi.string().required(),
    thumbnail: Joi.string().optional()
})

module.exports = createCategorySchema