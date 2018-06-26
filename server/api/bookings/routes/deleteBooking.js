const Booking = require('../model/Booking')
const checkPrivileges = require('../util/bookingFunctions').checkPrivileges

module.exports = {
    method: 'DELETE',
    path: '/api/bookings/{id}',
    options: {
        handler: async (request, h) => {
            await Booking.deleteOne({ _id: request.params.id })

            return { message: 'Booking deleted'}
        },
        auth: {
            strategy: 'jwt'
        },
        pre: [
            { method: checkPrivileges, assign: 'booking' }
        ],
        description: 'Delete booking',
        notes: 'Deletes a booking if the request if from admin or the user who created it',
        tags: ['api', 'booking']
    }
}