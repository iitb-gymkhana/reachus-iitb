const Booking = require('../model/Booking')
const Room = require('../../rooms/model/Room')
const createBookingSchema = require('../schemas/createBooking')
const moment = require('moment-timezone')

const TZ = 'Asia/Kolkata'

module.exports = {
    method: 'POST',
    path: '/api/bookings',
    options: {
        handler: async (request, h) => {
            const booking = new Booking()

            booking.from = moment(request.payload.from).tz(TZ)
            booking.to = moment(request.payload.to).tz(TZ)
            booking.room = request.payload.room
            booking.user = request.auth.credentials.id

            await booking.save()
            
            return booking
        },
        auth: {
            strategy: 'jwt'
        },
        validate: {
            payload: createBookingSchema
        },
        description: 'Create booking',
        notes: 'Creates booking and associates users with it (requires authentication)',
        tags: ['api', 'booking']
    }
}