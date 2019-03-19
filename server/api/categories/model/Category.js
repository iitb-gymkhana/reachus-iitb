const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categoryModel = new Schema({
    uniqueIdentifier: { type: String, required: true, index: { unique: true } },
    name: { type: String, required: true },
    thumbnail: { type: String, default: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=300' }
})

module.exports = mongoose.model('Category', categoryModel)