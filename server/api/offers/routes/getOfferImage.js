module.exports = {
  method: 'GET',
  path: '/api/uploads/{file*}',
  handler: {
    directory: {
      path: __dirname + '/../uploads'
    }
  }
}