const Booking = require('../model/Booking')
const Room = require('../../rooms/model/Room')

async function addRoomDetailsToBooking(booking) {
    const room = await Room.findOne({ _id: booking.room })
    booking.roomNumber = room.number 
    booking.roomName = room.name
    return booking
}

module.exports = {
    addRoomDetailsToBooking: addRoomDetailsToBooking
}