const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookingModel = new Schema({
    from: { type: Date, required: true },
    to: { type: Date, required: true },
    room: { type: Schema.Types.ObjectId, ref: 'Room' },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Booking', bookingModel)