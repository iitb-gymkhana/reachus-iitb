const Offer = require('../model/Offer')
const moment = require('moment-timezone')
const checkCategoryExists = require('../util/offerFunctions').checkCategoryExists
const uuidv1 = require('uuid/v1');
const path = require('path')
const sharp = require('sharp')

module.exports = {
    method: 'PATCH',
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
            const offer = await Offer.findOneAndUpdate(
              {
                _id: request.payload._id
              },
              {
                $set: request.payload
              },
              {
                new: true
              }
            );

            offer.validTill = moment(request.payload.validTill).endOf('day')

            if (request.payload.offerImage) {
              let offerIamgeFileName = request.payload.offerImage.hapi.filename
            
              offerIamgeFileName = uuidv1() + path.extname(offerIamgeFileName)
              await sharp(request.payload.offerImage._data)
                  .toFile(__dirname + '/../uploads/' + offerIamgeFileName)
                  
              offer.offerImageFileName = offerIamgeFileName
            }
            
            await offer.save()
            
            return { message: 'Offer created', offer: offer }
        },
        auth: {
            strategy: 'jwt'
        },
        description: 'Create offer',
        notes: 'Creates offer and associates users with it (requires authentication)',
        tags: ['api', 'offer']
    }
}