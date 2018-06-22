const Room = require('../model/Room')
const createRoomSchema = require('../schemas/createRoom')
const verifyUniqueRoom = require('../util/roomFunctions').verifyUniqueRoom

module.exports = {
    method: 'POST',
    path: '/api/rooms',
    options: {
        handler: async (request, h) => {
            let room = new Room()
    
            room.number = request.payload.number
            room.name = request.payload.name
    
            await room.save()
    
            return { message: 'Room successfully created' }
        },
        auth: {
            strategy: 'jwt',
            scope: ['admin']
        },
        pre: [
            { method: verifyUniqueRoom }
        ],
        validate: {
            payload: createRoomSchema
        }
    }
}