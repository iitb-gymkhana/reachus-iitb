const Booking = require('../model/Booking')
const verifyBookingExists = require('../util/bookingFunctions').verifyBookingExists

module.exports = {
    method: 'PATCH',
    path: '/api/bookings/{id}/status',
    options: {
        pre: [
            { method: verifyBookingExists, assign: 'booking' }
        ],
        handler: async (request, h) => {
            await Booking.updateOne(
                { _id: request.params.id },
                { status: request.payload.status }
            )

            return { message: 'Booking approved' }
        },
        auth: {
            strategy: 'jwt',
            scope: 'admin'
        },
        description: 'Approve booking',
        notes: 'Approves the booking',
        tags: ['api', 'booking']
    }
    

}