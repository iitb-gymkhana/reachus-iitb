const Category = require('../model/Category')
const checkCategoryExists = require('../util/categoryFunctions').checkCategoryExists

module.exports = {
    method: 'GET',
    path: '/api/categories/{number}',
    options: {
        pre: [
            { method: checkCategoryExists, assign: 'category' }
        ],
        handler: async (request, h) => {
            return request.pre.category
        },
        description: 'Get category details',
        notes: 'Return category details by the paramter number provided in the path',
        tags: ['api', 'category']
    }
}