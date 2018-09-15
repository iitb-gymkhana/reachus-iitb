const Booking = require('../model/Booking')
const Room = require('../../rooms/model/Room')
const addRoomDetailsToBooking = require('../util/bookingFunctions').addRoomDetailsToBooking

module.exports = {
    method: 'GET',
    path: '/api/bookings/user',
    options: {
        handler: async (request, h) => {
            const bookings = await Booking.find(
                { user_id: request.auth.credentials.id }
            )
            .select('-__v')
            .lean()

            for (let i = 0; i < bookings.length; i++) {
                bookings[i] = await addRoomDetailsToBooking(bookings[i])
            }

            return bookings
        },
        auth: {
            strategy: 'jwt'
        },
        description: 'Get bookings of a user',
        notes: 'Returns all bookings made by a user',
        tags: ['api', 'booking']
    }
}