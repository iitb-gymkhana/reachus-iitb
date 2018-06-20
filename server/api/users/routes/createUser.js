const bcrypt = require('bcrypt')
const Boom = require('boom')
const User = require('../model/User')
const createUserSchema = require('../schemas/createUser')
const checkUserExists = require('../util/userFunctions').checkUserExists
const createToken = require('../util/token')

async function hashPasword(password) {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
}

module.exports = {
    method: 'POST',
    path: '/api/users',
    handler: async (request, h) => {
        let user = await checkUserExists(request)

        if (user) {
            return Boom.badRequest('User exists!')
        }

        user = new User()
        user.email = request.payload.email
        user.admin = false

        user.password = await hashPasword(request.payload.password)

        await user.save()

        return { token: createToken(user) }        
    },
    options: {
        validate: {
            payload: createUserSchema
        }
    }    
}