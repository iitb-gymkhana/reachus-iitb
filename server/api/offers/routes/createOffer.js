const Offer = require('../model/Offer')
const createOfferSchema = require('../schemas/createOffer')
const moment = require('moment-timezone')
const checkCategoryExists = require('../util/offerFunctions').checkCategoryExists

const TZ = 'Asia/Kolkata'

module.exports = {
    method: 'POST',
    path: '/api/offers',
    options: {
        pre: [
            { method: checkCategoryExists }
        ],
        handler: async (request, h) => {
            const offer = new Offer(request.payload)

            offer.user_id = request.auth.credentials.id
            offer.status = 'Pending Approval'
            
            await offer.save()
            
            return { message: 'Offer created'}
        },
        auth: {
            strategy: 'jwt'
        },
        validate: {
            payload: createOfferSchema
        },
        description: 'Create offer',
        notes: 'Creates offer and associates users with it (requires authentication)',
        tags: ['api', 'offer']
    }
}