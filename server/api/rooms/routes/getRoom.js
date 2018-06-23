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
        }
    }
}