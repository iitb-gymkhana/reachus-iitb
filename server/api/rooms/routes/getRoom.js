const Room = require('../model/Room')
const checkRoomExists = require('../util/roomFunctions').checkRoomExists

module.exports = {
    method: 'GET',
    path: '/api/rooms/{number}',
    options: {
        pre: [
            { method: checkRoomExists, assign: 'room' }
        ],
        handler: async (request, h) => {
            return request.pre.room
        },
        description: 'Get room details',
        notes: 'Return room details by the paramter number provided in the path',
        tags: ['api', 'room']
    }
}