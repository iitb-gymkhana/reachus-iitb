const Room = require('../model/Room')
const checkRoomExists = require('../util/roomFunctions').checkRoomExists

module.exports = {
    method: 'DELETE',
    path: '/api/rooms/{number}',
    options: {
        pre: [
            { method: checkRoomExists, assign: 'room' }
        ],
        handler: async (request, h) => {
            const room = request.pre.room
            const message = `${room.number} - ${room.name} deleted`
            
            await Room.deleteOne({ number: room.number})

            return { message: message }
        },
        auth: {
            strategy: 'jwt',
            scope: ['superuser']
        },
        description: 'Delete room',
        notes: 'Deletes the room with number provided in path',
        tags: ['api', 'room', 'admin']
    }
}