const User = require('../../users/model/User')
const Boom = require('boom')

module.exports = {
  method: 'GET',
  path: '/api/users/{user}',
  options: {
    handler: async (request, h) => {
      const user = await User.findOne({ldap_username: request.params.user}).lean()
      
      if (!user) {
        return Boom.notFound(`No user with username ${request.params.user} present`)
      }

      return user
    },
    auth: {
      strategy: 'jwt',
      scope: ['superuser']
    },
    description: 'Gets user\'s details',
    notes: 'Gets user\'s details',
    tags: ['api', 'user', 'superuser']
  }
}