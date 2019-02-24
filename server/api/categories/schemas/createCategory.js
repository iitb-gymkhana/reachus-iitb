const Joi = require('joi')

const createCategorySchema = Joi.object().keys({
    number: Joi.number().required(),
    name: Joi.string().required()
})

module.exports = createCategorySchema