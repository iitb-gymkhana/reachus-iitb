const User = require('../../users/model/User')

module.exports = {
  method: 'POST',
  path: '/api/users/privilege',
  options: {
    handler: async (request, h) => {
      const privilege = request.payload.privilege
      const user = await User.findOne({ldap_username: request.payload.ldap_username})

      if (privilege === 'admin') {
        user.admin = request.payload.value
      }

      if (privilege === 'moderator') {
        user.moderator = request.payload.value
      }

      user.save()

      return { message: `Changed ${user.ldap_username}'s ${privilege} privilege to ${user[privilege]}`}
    },
    auth: {
      strategy: 'jwt',
      scope: ['admin']
    },
    description: 'Change user\' privilege',
    notes: 'Changes user\'s privilege',
    tags: ['api', 'user', 'admin']
  }
}