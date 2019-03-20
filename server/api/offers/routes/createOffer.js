const Offer = require('../model/Offer')
const createOfferSchema = require('../schemas/createOffer')
const moment = require('moment-timezone')
const checkCategoryExists = require('../util/offerFunctions').checkCategoryExists
const fs = require('fs')
const uuidv1 = require('uuid/v1');
const path = require('path')
const sharp = require('sharp')

const TZ = 'Asia/Kolkata'

module.exports = {
    method: 'POST',
    path: '/api/offers',
    options: {
        payload: {
            output: "stream",
            parse: true,
            allow: "multipart/form-data",
            maxBytes: 10 * 1024 * 1024
        },
        pre: [
            { method: checkCategoryExists }
        ],
        handler: async (request, h) => {
            const offer = new Offer(request.payload)

            offer.user_id = request.auth.credentials.id
            offer.status = 'Pending Approval'
            offer.validTill = moment(request.payload.validTill).endOf('day')

            let offerIamgeFileName = request.payload.offerImage.hapi.filename
            
            offerIamgeFileName = uuidv1() + path.extname(offerIamgeFileName)
            await sharp(request.payload.offerImage._data)
                .toFile(__dirname + '/../uploads/' + offerIamgeFileName)
                
            offer.offerImageFileName = offerIamgeFileName
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