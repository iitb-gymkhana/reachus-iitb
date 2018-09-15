const bcrypt = require('bcrypt')
const boom = require('boom')
const authenticateUserSchema = require('../schemas/authenticateUser')
const verifySSOCode = require('../util/userFunctions').verifySSOCode
const getUserDetails = require('../util/userFunctions').getUserDetails

module.exports = {
    method: 'POST',
    path: '/api/users/authenticate',
    options: {
        pre: [
            { method: verifySSOCode, assign: 'user' }
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