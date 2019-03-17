const Category = require('../model/Category')
const Boom = require('boom')

module.exports = {
    method: 'PUT',
    path: '/api/categories',
    options: {
        handler: async (request, h) => {
            let category = await Category.findOne(
                { _id: request.payload._id }
            )

            if (!category) {
                return Boom.badRequest('Category does not exist')
            }
            console.log(request.payload)

            category = await Category.findOne(
                { uniqueIdentifier: request.payload.uniqueIdentifier }
            )

            if (category && category.id !== request.payload._id) {
                return Boom.badRequest(`Category unique identifier ${request.payload.uniqueIdentifier} already exists!`)
            }

            await Category.updateOne(
                { _id: request.payload._id },
                { 
                    uniqueIdentifier: request.payload.uniqueIdentifier,
                    name: request.payload.name
                }
            )

            return { message: 'Successfully updated'}
        },
        auth: {
            strategy: 'jwt',
            scope: ['admin']
        },
        description: 'Update category',
        notes: 'Updates the category details',
        tags: ['api', 'category', 'admin']
    }
}