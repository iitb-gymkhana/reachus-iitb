const Booking = require('../model/Booking')
const Room = require('../../rooms/model/Room')
const addRoomDetailsToBooking = require('../util/bookingFunctions').addRoomDetailsToBooking

module.exports = {
    method: 'GET',
    path: '/api/bookings',
    options: {
        handler: async (request, h) => {
            const query_status = request.query.status
            let bookings = []

            if (query_status) {
                bookings = await Booking.find({status: query_status}).select('-__v').sort({from: -1}).lean()
            } else {
                bookings = await Booking.find().sort('-from').select('-__v').lean()
            }

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