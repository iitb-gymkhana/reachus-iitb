const Offer = require('../model/Offer')
const User = require('../../users/model/User')
const addCategoryDetailsToOffer = require('../util/offerFunctions').addCategoryDetailsToOffer
const moment = require('moment')

module.exports = {
    method: 'GET',
    path: '/api/offers',
    options: {
        handler: async (request, h) => {
            const req_query = request.query
            const query = {}
            
            if (req_query.status) {
                query.status = req_query.status
            }

            if (req_query.from) {
                query.to = {
                    $gte: moment(req_query.from)
                }
            }

            if (req_query.user) {
                const user = await User.findOne({ldap_username: req_query.user})
                if (user) {
                    query.user_id = user._id
                }
            }

            if (req_query.to) {
                if (!query.to) {
                    query.to = { }
                }
                query.to['$lt'] = moment(req_query.to)
            }
            
            const sort_order = request.query.sort === 'desc' ? -1 : 1

            let offers = []

            offers = await Offer.find(query).select('-__v').sort({from: sort_order}).lean()

            for (let i = 0; i < offers.length; i++) {
                offers[i] = await addCategoryDetailsToOffer(offers[i])
            }

            return offers
        },
        description: 'Get all offers',
        notes: 'Returns all offers made by every all users',
        tags: ['api', 'offer']
    }
}