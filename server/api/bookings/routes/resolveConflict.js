const Booking = require('../model/Booking')

module.exports = {
    method: 'PATCH',
    path: '/api/bookings/conflict',
    options: {
        handler: async (request, h) => {
            const approveId = request.payload.approveId
            const rejectId = request.payload.rejectId

            await Booking.updateOne(
                { _id: approveId },
                { status: 'Approved' }
            )

            await Booking.updateOne(
                { _id: rejectId },
                { status: 'Rejected' }
            )

            return { message: 'Conflict resolved' }
        },
        auth: {
            strategy: 'jwt',
            scope: ['admin', 'superuser']
        },
        description: 'Resolve booking conflicts',
        notes: 'Resolves booking conflicts',
        tags: ['api', 'booking', 'conflict']
    }
}