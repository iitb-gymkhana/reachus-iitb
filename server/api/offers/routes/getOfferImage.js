const sharp = require('sharp')

module.exports = {
  method: 'GET',
  path: '/api/uploads/{file}',
  handler: async (request, h) => {
    const offerImagePath = __dirname + `/../uploads/${request.params.file}`
    let offerImage = await sharp(offerImagePath)

    if (request.query.w) {
      offerImage = await offerImage.resize(+request.query.w)
    }

    offerImage = await offerImage.toBuffer()

    return h.response(offerImage)
            .header('Content-Disposition','inline')
            .header('Content-type','image/png')
  }
}