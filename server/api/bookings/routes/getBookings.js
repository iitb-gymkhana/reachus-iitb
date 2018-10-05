const Booking = require('../model/Booking')
const User = require('../../users/model/User')
const addRoomDetailsToBooking = require('../util/bookingFunctions').addRoomDetailsToBooking
const moment = require('moment')

module.exports = {
    method: 'GET',
    path: '/api/bookings',
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

            let bookings = []

            bookings = await Booking.find(query).select('-__v').sort({from: sort_order}).lean()

            for (let i = 0; i < bookings.length; i++) {
                bookings[i] = await addRoomDetailsToBooking(bookings[i])
            }

            return bookings
        },
        description: 'Get all bookings',
        notes: 'Returns all bookings made by every all users',
        tags: ['api', 'booking']
    }
}