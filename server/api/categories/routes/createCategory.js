const Category = require('../model/Category')
const createCategorySchema = require('../schemas/createCategory')
const verifyUniqueCategory = require('../util/categoryFunctions').verifyUniqueCategory

module.exports = {
    method: 'POST',
    path: '/api/categories',
    options: {
        handler: async (request, h) => {
            let category = new Category(request.payload)

            category.thumbnail = category.thumbnail.substring(0, category.thumbnail.indexOf('?')) + '?w=300'
    
            await category.save()
    
            return { message: 'Category successfully created' }
        },
        auth: {
            strategy: 'jwt',
            scope: ['admin']
        },
        pre: [
            { method: verifyUniqueCategory }
        ],
        validate: {
            payload: createCategorySchema
        },
        description: 'Create category',
        notes: 'Creates a category. Requires user to be admin',
        tags: ['api', 'category', 'admin']
    }
}