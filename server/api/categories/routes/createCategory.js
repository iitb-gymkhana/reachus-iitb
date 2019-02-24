const Category = require('../model/Category')
const createCategorySchema = require('../schemas/createCategory')
const verifyUniqueCategory = require('../util/categoryFunctions').verifyUniqueCategory

module.exports = {
    method: 'POST',
    path: '/api/categories',
    options: {
        handler: async (request, h) => {
            let category = new Category()
    
            category.number = request.payload.number
            category.name = request.payload.name
    
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