const Offer = require('../model/Offer')
const Category = require('../../categories/model/Category')
const User = require('../../users/model/User')
const Boom = require('boom')
const moment = require('moment')
const ObjectId = require('mongoose').Types.ObjectId

async function addCategoryDetailsToOffer(offer) {
    const category = await Category.findOne({ _id: offer.category })
    offer.categoryNumber = category.number 
    offer.categoryName = category.name

    const user = await User.findOne({_id: offer.user_id})
    offer.userLdapUsername = user.ldap_username
    
    return offer
}

async function checkPrivileges(request, h) {
    const offer = await Offer.findOne({ _id: request.params.id })

    if (!offer) {
        return Boom.badRequest('Offer does not exist')
    }

    const credentials = request.auth.credentials

    if (credentials.scope === 'admin' ||
        ObjectId(credentials.id).equals(ObjectId(offer.user_id))) {
            return offer
        }

    return Boom.badRequest('Not enough previleges')
}

async function verifyOfferExists(request, h) {
    const offer = await Offer.findOne({_id: request.params.id})

    if (!offer) {
        return Boom.badRequest('Offer does not exist')
    }
    
    return offer
}

// async function checkForConflictedOffer(request, h) {

//     if (request.payload.status != 'Approved') {
//         return true
//     }
    
//     const offer = request.pre.offer

//     const from = offer.from
//     const to = offer.to

//     const conflictedOffer = await Offer.findOne(
//         {
//             _id: { $ne: offer.id },
//             category: offer.category, 
//             status: 'Approved',
//             to: { $gt: from },
//             from: { $lt: to }
//         }
//     ).lean()

//     if (conflictedOffer) {
//         const error = Boom.conflict('Offer conflict!')
//         error.output.payload.offer = await addCategoryDetailsToOffer(conflictedOffer)
        
//         return error
//     }
    
//     return true

// }

async function checkCategoryExists(request, h) {
    const category = await Category.findOne({ _id: request.payload.category })

    if (!category) {
        return Boom.badRequest('Category does not exist')
    }

    return category
}

async function checkIfOfferFinished(request, h) {
    const offer = await Offer.findOne({_id: request.params.id})

    if (moment(offer.validTill, 'day').isSameOrBefore(moment('day').endOf('day'))) {
        return Boom.forbidden('Cannot modify/delete offer after it has finished')
    }

    return offer
}

module.exports = {
    addCategoryDetailsToOffer: addCategoryDetailsToOffer,
    checkPrivileges: checkPrivileges,
    verifyOfferExists: verifyOfferExists,
    // checkForConflictedOffer: checkForConflictedOffer,
    checkCategoryExists: checkCategoryExists,
    checkIfOfferFinished: checkIfOfferFinished
}