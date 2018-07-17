const bcrypt = require('bcrypt')
const boom = require('boom')
const authenticateUserSchema = require('../schemas/authenticateUser')
const verifyCredentials = require('../util/userFunctions').verifyCredentials
const getUserDetails = require('../util/userFunctions').getUserDetails

module.exports = {
    method: 'POST',
    path: '/api/users/authenticate',
    options: {
        pre: [
            { method: verifyCredentials, assign: 'user' }
        ],
        handler: async (request, h) => {
            return getUserDetails(request.pre.user);
        },
        validate: {
            payload: authenticateUserSchema
        },
        description: 'User login',
        notes: 'Returns a token on correct user credentials',
        tags: ['api', 'user']
    }
}