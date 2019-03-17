const Category = require('../model/Category')
const checkCategoryExists = require('../util/categoryFunctions').checkCategoryExists
const Offer = require('../../offers/model/Offer')

module.exports = {
    method: 'DELETE',
    path: '/api/categories/{uniqueIdentifier}',
    options: {
        pre: [
            { method: checkCategoryExists, assign: 'category' }
        ],
        handler: async (request, h) => {
            const category = request.pre.category
            const message = `${category.uniqueIdentifier} - ${category.name} deleted`
            
            await Offer.deleteMany({ category: category._id })
            await Category.deleteOne({ _id: category._id})

            return { message: message }
        },
        auth: {
            strategy: 'jwt',
            scope: ['admin']
        },
        description: 'Delete category',
        notes: 'Deletes the category with uniqueIdentifier provided in path',
        tags: ['api', 'category', 'admin']
    }
}