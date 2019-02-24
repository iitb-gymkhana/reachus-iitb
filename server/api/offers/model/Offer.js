const mongoose = require('mongoose')
const Schema = mongoose.Schema

const offerModel = new Schema({
    validTill: { type: Date, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    companyName: { type: String, required: true },
    offerDetails: { type: String, required: true },
    status: { type: String, enum: ['Pending Approval', 'Approved', 'Rejected']}
})

module.exports = mongoose.model('Offer', offerModel)