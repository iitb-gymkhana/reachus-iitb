const Room = require('../model/Room')

module.exports = {
    method: 'GET',
    path: '/api/rooms',
    options: {
        handler: async (request, h) => {
            const rooms = Room.find().select('-__v -_id')

            return rooms
        }
    }
}