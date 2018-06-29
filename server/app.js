'use strict';

const Hapi = require('hapi');
const mongoose = require('mongoose');
const glob = require('glob');
const path = require('path');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');
const User = require('./api/users/model/User')

require('dotenv').config();

const SECRET = process.env.SECRET;
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_PORT = process.env.DB_PORT;
const SERVER_PORT = process.env.SERVER_PORT || 3000
const SERVER_HOST = process.env.SERVER_HOST || 'localhost'

const dbUrl = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/SAC`;

const validate = async function (decoded, request) {
    const user = await User.findOne({_id: decoded.id})

    if (user) {
        return { isValid: true }
    } 

    return { isValid: false }
};

const init = async () => {
    const server = new Hapi.Server({
        port: SERVER_PORT,
        host: SERVER_HOST,
        routes: {
            cors: {
                origin: ['*']
            }
        }
    });

    const swaggerOptions = {
        info: {
            title: 'API Documentation',
            version: Pack.version,
        },
    };

    await server.register(require('hapi-auth-jwt2'));

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ])
    
    const options = {
        ops: {
            interval: 1000
        },
        reporters: {
            myConsoleReporter: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{ log: '*', response: '*' }]
            }, {
                module: 'good-console'
            }, 'stdout'],
        }
    };
    
    await server.register({
        plugin: require('good'),
        options,
    });
    
    server.auth.strategy('jwt', 'jwt', {
        key: SECRET,
        validate,
        verifyOptions: { algorithms: ['HS256' ]}
    });

    glob.sync('api/**/routes/*.js', {
        root: __dirname
    }).forEach(file => {
        const route = require(path.join(__dirname, file))
        route.path = '/sac/booking' + route.path
        server.route(route);
    });
    
    mongoose.connect(dbUrl, {}, (err) => {
        if (err) {
            throw err;
        } else {
            console.log('Connected to MongoDB...')
        }
    });

    await server.start();

    console.log(`Server running at: ${server.info.uri}`);  
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});


init();