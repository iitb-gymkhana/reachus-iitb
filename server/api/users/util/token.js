const jwt = require('jsonwebtoken')

require('dotenv').config()

SECRET = process.env.SECRET

function createToken(user) {
    let scopes;

    if (user.moderator) {
        scopes = 'moderator'
    }
    
    if (user.admin) {
        scopes = 'admin'
    }

    return jwt.sign(
        {
            id: user._id, 
            email: user.email, 
            scope: scopes
        }, 
        SECRET, 
        { 
            algorithm: 'HS256', 
            expiresIn: '1h' 
        }
    )
}

module.exports = createToken