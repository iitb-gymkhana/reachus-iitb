const Booking = require('../model/Booking')
const Room = require('../../rooms/model/Room')
const addRoomDetailsToBooking = require('../util/bookingFunctions').addRoomDetailsToBooking

module.exports = {
    method: 'GET',
    path: '/api/bookings',
    options: {
        handler: async (request, h) => {
            const bookings = await Booking.find().select('-_id -__v').lean()

            for (let i = 0; i < bookings.length; i++) {
                bookings[i] = await addRoomDetailsToBooking(request, bookings[i])
            }
            return bookings
        },
        description: 'Get all bookings',
        notes: 'Returns all bookings made by every all users',
        tags: ['api', 'booking']
    }
}