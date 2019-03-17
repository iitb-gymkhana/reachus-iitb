const Boom = require('boom')
const Category = require('../model/Category')

async function verifyUniqueCategory(request, h) {
    const category = await Category.findOne({
        uniqueIdentifier: request.payload.uniqueIdentifier
    })

    if (category) {
        return Boom.badRequest(`Category with identifier '${category.uniqueIdentifier}' exists!`)
    }

    return category
}

async function checkCategoryExists(request, h) {
    const category = await Category.findOne({ uniqueIdentifier: request.params.uniqueIdentifier })

    if (!category) {
        return Boom.badRequest('Category does not exist')
    }

    return category
}

module.exports = {
    verifyUniqueCategory: verifyUniqueCategory,
    checkCategoryExists: checkCategoryExists
}