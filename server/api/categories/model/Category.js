const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categoryModel = new Schema({
    uniqueIdentifier: { type: String, required: true, index: { unique: true } },
    name: { type: String, required: true }
})

module.exports = mongoose.model('Category', categoryModel)