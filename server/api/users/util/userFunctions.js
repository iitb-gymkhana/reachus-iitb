const Boom = require('boom')
const User = require('../model/User')
const bcrypt = require('bcrypt')
const createToken = require('../util/token')
const request = require('request-promise')

async function verifyUniqueUser(request, h) {
    const user = await User.findOne({
        email: request.payload.email
    })

    if (user) {
        return Boom.badRequest('User exists!')
    }

    return user
}

async function verifyCredentials(request) {
    const user = await User.findOne({
        email: request.payload.email
    }).select('-__v').lean()

    if (user) {
        const isValid = await bcrypt.compare(request.payload.password, user.password)

        if (isValid) {
            return user
        } else {
            return Boom.badRequest('Incorrect password!')
        }
    } else {
        return Boom.badRequest('User does not exist!')
    }
}

async function verifySSOCode(req) {
    const code = req.payload.code
    const client_id = process.env.CLIENT_ID
    const client_secret = process.env.CLIENT_SECRET
    const authorization_token = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
    const REDIRECT_URI = process.env.SSO_REDIRECT_URI
    
    try {
        let options = {
            method: 'POST',
            url: 'https://gymkhana.iitb.ac.in/sso/oauth/token/',
            headers: {
                'Authorization': `Basic ${authorization_token}`,
                'Content-Type': 'application/x-www-form-urlencoded'    
            },
            form: {
                code: code,
                redirect_uri: REDIRECT_URI,
                grant_type: 'authorization_code'
            }
        }

        let res = await request(options)
        res = JSON.parse(res)
        const access_token = res.access_token
        const refresh_token = res.refresh_token
        const sso_scope = res.scope
        
        try {
            options = {
                method: 'GET',
                url: 'https://gymkhana.iitb.ac.in/sso/user/api/user/',
                headers: {
                    'Authorization': `Bearer ${access_token}`
                },
                qs: {
                    fields: 'first_name,last_name,username,email'
                }
            }
            res = await request(options)
            res = JSON.parse(res)    
        } catch {
            return Boom.badImplementation('Failed to get details from SSO')
        }
        
        User.update(
            { ldap_username: res.username },
            {
                ldap_username: res.username,
                email: res.email,
                first_name: res.first_name,
                last_name: res.last_name,
                sso_scope: sso_scope,
                access_token: access_token,
                refresh_token: refresh_token
            },
            {
                upsert: true,
                setDefaultsOnInsert: true
            }
        )

        return await User.findOne({ ldap_username: res.username })
    } catch {
        return Boom.badImplementation('Issues while connecting to SSO')
    }
}

async function getUserDetails(user) {
    return {
        user: {
            email: user.email,
            ldap_username: user.ldap_username,
            admin: user.admin,
            token: createToken(user)
        }
    }
}

module.exports = {
    verifyUniqueUser: verifyUniqueUser,
    verifyCredentials: verifyCredentials,
    getUserDetails: getUserDetails,
    verifySSOCode: verifySSOCode
}