const Booking = require('../model/Booking')
const verifyBookingExists = require('../util/bookingFunctions').verifyBookingExists
const checkForConflictedBooking = require('../util/bookingFunctions').checkForConflictedBooking

module.exports = {
    method: 'PATCH',
    path: '/api/bookings/{id}/status',
    options: {
        pre: [
            { method: verifyBookingExists, assign: 'booking' },
            { method: checkForConflictedBooking, assign: 'conflictedBooking' }
        ],
        handler: async (request, h) => {
            await Booking.updateOne(
                { _id: request.params.id },
                { status: request.payload.status }
            )

            return { 
                message: `Booking ${request.payload.status}`,
                booking: { status: request.payload.status }
            }
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