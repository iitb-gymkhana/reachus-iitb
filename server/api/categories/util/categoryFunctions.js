const Boom = require('boom')
const Category = require('../model/Category')

async function verifyUniqueCategory(request, h) {
    const category = await Category.findOne({
        number: request.payload.number
    })

    if (category) {
        return Boom.badRequest(`Category ${category.number} exists!`)
    }

    return category
}

async function checkCategoryExists(request, h) {
    const category = await Category.findOne({ number: request.params.number })

    if (!category) {
        return Boom.badRequest('Category does not exist')
    }

    return category
}

module.exports = {
    verifyUniqueCategory: verifyUniqueCategory,
    checkCategoryExists: checkCategoryExists
}