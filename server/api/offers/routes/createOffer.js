const Offer = require('../model/Offer')
const createOfferSchema = require('../schemas/createOffer')
const moment = require('moment-timezone')
const checkCategoryExists = require('../util/offerFunctions').checkCategoryExists
const fs = require('fs')

const TZ = 'Asia/Kolkata'

module.exports = {
    method: 'POST',
    path: '/api/offers',
    options: {
        payload: {
            output: "stream",
            parse: true,
            allow: "multipart/form-data",
        },
        pre: [
            { method: checkCategoryExists }
        ],
        handler: async (request, h) => {
            const offer = new Offer(request.payload)

            offer.user_id = request.auth.credentials.id
            offer.status = 'Pending Approval'

            const offerIamgeFileName = request.payload.offerImage.hapi.filename
            await request.payload.offerImage.pipe(fs.createWriteStream(__dirname + "/../uploads/" + offerIamgeFileName))
            
            offer.offerImageUrl = '' 
            await offer.save()

            
            return { message: 'Offer created'}
        },
        auth: {
            strategy: 'jwt'
        },

        description: 'Create offer',
        notes: 'Creates offer and associates users with it (requires authentication)',
        tags: ['api', 'offer']
    }
}