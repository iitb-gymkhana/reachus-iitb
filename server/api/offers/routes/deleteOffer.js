const Offer = require('../model/Offer')
const checkPrivileges = require('../util/offerFunctions').checkPrivileges
const checkIfOfferFinished = require('../util/offerFunctions').checkIfOfferFinished
const fs = require('fs')

module.exports = {
    method: 'DELETE',
    path: '/api/offers/{id}',
    options: {
        handler: async (request, h) => {
            const offer = await Offer.findOneAndDelete({ _id: request.params.id })

            await fs.unlinkSync(__dirname + '/../uploads/' + offer.offerImageFileName)

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