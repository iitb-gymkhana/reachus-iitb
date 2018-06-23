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
                bookings[i] = await addRoomDetailsToBooking(bookings[i])
            }
            return bookings
        }
    }
}