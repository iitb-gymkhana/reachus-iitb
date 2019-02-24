const Offer = require('../model/Offer')
const verifyOfferExists = require('../util/offerFunctions').verifyOfferExists
// const checkForConflictedOffer = require('../util/offerFunctions').checkForConflictedOffer
const checkIfOfferFinished = require('../util/offerFunctions').checkIfOfferFinished

module.exports = {
  method: 'PATCH',
  path: '/api/offers/{id}/status',
  options: {
    pre: [{
        method: checkIfOfferFinished
      },
      {
        method: verifyOfferExists,
        assign: 'offer'
      }
    ],
    handler: async (request, h) => {
        const offer = await Offer.findOneAndUpdate({
          _id: request.params.id
        }, {
          $set: {
            status: request.payload.status
          }
        }, {
          new: true
        })

        return {
          message: `Offer ${request.payload.status}`,
          offer: {
            status: request.payload.status
          }
        }
      },
      auth: {
        strategy: 'jwt',
        scope: ['admin', 'moderator']
      },
      description: 'Approve offer',
      notes: 'Approves the offer',
      tags: ['api', 'offer']
  }


}
