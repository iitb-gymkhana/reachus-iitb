const Booking = require('../model/Booking')
const Room = require('../../rooms/model/Room')
const User = require('../../users/model/User')
const Boom = require('boom')

async function addRoomDetailsToBooking(request, booking) {
    const room = await Room.findOne({ _id: booking.room })
    booking.roomNumber = room.number 
    booking.roomName = room.name

    const user = await User.findOne({_id: booking.user})
    booking.userEmail = user.email
    return booking
}

async function checkPrivileges(request, h) {
    const booking = await Booking.findOne({ _id: request.params.id })

    if (!booking) {
        return Boom.badRequest('Booking does not exist')
    }

    const credentials = request.auth.credentials

    if (credentials.scope === 'admin' ||
        credentials.id === booking.user) {
            return booking
        }

    return Boom.badRequest('Not enough previleges')
}

async function verifyBookingExists(request, h) {
    const booking = await Booking.findOne({_id: request.params.id})

    if (!booking) {
        return Boom.badRequest('Booking does not exist')
    }
    
    return booking
}

module.exports = {
    addRoomDetailsToBooking: addRoomDetailsToBooking,
    checkPrivileges: checkPrivileges,
    verifyBookingExists: verifyBookingExists
}