const Room = require('../model/Room')

module.exports = {
    method: 'GET',
    path: '/api/rooms',
    options: {
        handler: async (request, h) => {
            const rooms = Room.find().select('-__v').sort('number')

            return rooms
        },
        description: `Get all rooms' details`,
        notes: 'Returns details of all rooms',
        tags: ['api', 'room']
    }
}