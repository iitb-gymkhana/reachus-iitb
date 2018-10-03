const bcrypt = require('bcrypt')
const Boom = require('boom')
const User = require('../model/User')
const createUserSchema = require('../schemas/createUser')
const verifyUniqueUser = require('../util/userFunctions').verifyUniqueUser
const getUserDetails = require('../util/userFunctions').getUserDetails

async function hashPasword(password) {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  return hash
}

module.exports = {
  method: 'POST',
  path: '/api/users',
  options: {
    handler: async (request, h) => {

      let user = new User()
      user.email = request.payload.email

      user.password = await hashPasword(request.payload.password)

      await user.save()

      return getUserDetails(user);
    },
    pre: [{
      method: verifyUniqueUser
    }],
    validate: {
      payload: createUserSchema
    },
    description: 'User signup',
    notes: 'Returns a token on successful signup',
    tags: ['api', 'user']
  }
}
