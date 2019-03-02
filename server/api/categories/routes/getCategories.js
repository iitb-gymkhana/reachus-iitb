const Category = require('../model/Category')

module.exports = {
    method: 'GET',
    path: '/api/categories',
    options: {
        handler: async (request, h) => {
            const categories = Category.find().select('-__v').sort('number')

            return categories
        },
        description: `Get all categories' details`,
        notes: 'Returns details of all categories',
        tags: ['api', 'category']
    }
}