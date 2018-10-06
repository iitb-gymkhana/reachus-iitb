const Booking = require('../model/Booking')
const Room = require('../../rooms/model/Room')
const User = require('../../users/model/User')
const Boom = require('boom')
const moment = require('moment')

async function addRoomDetailsToBooking(booking) {
    const room = await Room.findOne({ _id: booking.room })
    booking.roomNumber = room.number 
    booking.roomName = room.name

    const user = await User.findOne({_id: booking.user_id})
    booking.userLdapUsername = user.ldap_username
    return booking
}

async function checkPrivileges(request, h) {
    const booking = await Booking.findOne({ _id: request.params.id })

    if (!booking) {
        return Boom.badRequest('Booking does not exist')
    }

    const credentials = request.auth.credentials

    if (credentials.scope === 'admin' ||
        credentials.id === booking.user_id) {
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

async function checkForConflictedBooking(request, h) {

    if (request.payload.status != 'Approved') {
        return true
    }
    
    const booking = request.pre.booking

    const from = booking.from
    const to = booking.to

    const conflictedBooking = await Booking.findOne(
        {
            _id: { $ne: booking.id },
            room: booking.room, 
            status: 'Approved',
            to: { $gt: from },
            from: { $lt: to }
        }
    ).lean()

    if (conflictedBooking) {
        const error = Boom.conflict('Booking conflict!')
        error.output.payload.booking = await addRoomDetailsToBooking(conflictedBooking)
        
        return error
    }
    
    return true

}

async function checkRoomExists(request, h) {
    const room = await Room.findOne({ _id: request.payload.room })

    if (!room) {
        return Boom.badRequest('Room does not exist')
    }

    return room
}

async function checkIfBookingFinished(request, h) {
    const booking = await Booking.findOne({_id: request.params.id})

    if (booking.to < moment()) {
        return Boom.forbidden('Cannot modify/delete booking after it has finished')
    }

    return booking
}

module.exports = {
    addRoomDetailsToBooking: addRoomDetailsToBooking,
    checkPrivileges: checkPrivileges,
    verifyBookingExists: verifyBookingExists,
    checkForConflictedBooking: checkForConflictedBooking,
    checkRoomExists: checkRoomExists,
    checkIfBookingFinished: checkIfBookingFinished
}