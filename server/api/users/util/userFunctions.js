const Boom = require('boom')
const User = require('../model/User')

async function checkUserExists(req) {
    return await User.findOne({
        email: req.payload.email
    })
}

module.exports = {
    checkUserExists: checkUserExists
}