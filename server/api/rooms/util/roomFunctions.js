const Boom = require('boom')
const Room = require('../model/Room')

async function verifyUniqueRoom(request, h) {
    const room = await Room.findOne({
        number: request.payload.number
    })

    if (room) {
        return Boom.badRequest(`Room ${room.number} exists!`)
    }

    return room
}

async function checkRoomExists(request, h) {
    const room = await Room.findOne({ number: request.params.number })

    if (!room) {
        return Boom.badRequest('Room does not exist')
    }

    return room
}

module.exports = {
    verifyUniqueRoom: verifyUniqueRoom,
    checkRoomExists: checkRoomExists
}