const Offer = require('../model/Offer')
const checkPrivileges = require('../util/offerFunctions').checkPrivileges
const checkIfOfferFinished = require('../util/offerFunctions').checkIfOfferFinished

module.exports = {
    method: 'DELETE',
    path: '/api/offers/{id}',
    options: {
        handler: async (request, h) => {
            await Offer.deleteOne({ _id: request.params.id })

            return { message: 'Offer deleted'}
        },
        auth: {
            strategy: 'jwt'
        },
        pre: [
            { method: checkIfOfferFinished },
            { method: checkPrivileges, assign: 'offer' }
        ],
        description: 'Delete offer',
        notes: 'Deletes a offer if the request if from admin or the user who created it',
        tags: ['api', 'offer']
    }
}