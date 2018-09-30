const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookingModel = new Schema({
    from: { type: Date, required: true },
    to: { type: Date, required: true },
    room: { type: Schema.Types.ObjectId, ref: 'Room' },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    councilName: { type: String, required: true },
    purposeOfBooking: { type: String, required: true },
    status: { type: String, enum: ['Pending Approval', 'Approved', 'Rejected']}
})

module.exports = mongoose.model('Booking', bookingModel)