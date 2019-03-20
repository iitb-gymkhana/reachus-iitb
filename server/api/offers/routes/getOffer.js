const Offer = require('../model/Offer')
const checkPrivileges = require('../util/offerFunctions').checkPrivileges

module.exports = {
    method: 'GET',
    path: '/api/offers/{id}',
    options: {
        handler: async (request, h) => {
            return request.pre.offer
        },
        auth: {
            strategy: 'jwt'
        },
        pre: [
            { method: checkPrivileges, assign: 'offer' }
        ],
        description: 'Retuns offer with provided id',
        notes: 'Retuns offer with provided id',
        tags: ['api', 'offer']
    }
}