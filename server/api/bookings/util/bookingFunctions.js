const Booking = require('../model/Booking')
const Room = require('../../rooms/model/Room')
const User = require('../../users/model/User')

async function addRoomDetailsToBooking(request, booking) {
    const room = await Room.findOne({ _id: booking.room })
    booking.roomNumber = room.number 
    booking.roomName = room.name

    const user = await User.findOne({_id: booking.user})
    booking.userEmail = user.email
    return booking
}

module.exports = {
    addRoomDetailsToBooking: addRoomDetailsToBooking
}