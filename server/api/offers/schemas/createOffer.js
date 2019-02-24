const Joi = require('joi')

module.exports = Joi.object().keys({
    validTill: Joi.date().required(),
    category: Joi.string().required(),
    companyName: Joi.string().required(),
    offerDetails: Joi.string().required(),
})