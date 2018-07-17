module.exports = {
    method: 'GET',
    path: '/api/users/verify',
    options : {
        handler: async (request, h) => {
            return 'hi'
        }
    }
}