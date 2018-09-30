const Joi = require('joi')

module.exports = Joi.object().keys({
    from: Joi.date().required(),
    to: Joi.date().required(),
    room: Joi.string().required(),
    councilName: Joi.string().required(),
    fullName: Joi.string().required(),
    contactNumber: Joi.string().required(),
    purposeOfBooking: Joi.string().required()
})