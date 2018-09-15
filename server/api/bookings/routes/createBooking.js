const Booking = require('../model/Booking')
const Room = require('../../rooms/model/Room')
const createBookingSchema = require('../schemas/createBooking')
const moment = require('moment-timezone')
const checkRoomExists = require('../util/bookingFunctions').checkRoomExists

const TZ = 'Asia/Kolkata'

module.exports = {
    method: 'POST',
    path: '/api/bookings',
    options: {
        pre: [
            { method: checkRoomExists }
        ],
        handler: async (request, h) => {
            const booking = new Booking()

            booking.from = moment(request.payload.from).tz(TZ)
            booking.to = moment(request.payload.to).tz(TZ)
            booking.room = request.payload.room
            booking.user_id = request.auth.credentials.id
            booking.status = 'Pending Approval'

            await booking.save()
            
            return { message: 'Booking created'}
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