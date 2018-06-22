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

module.exports = {
    verifyUniqueRoom: verifyUniqueRoom
}