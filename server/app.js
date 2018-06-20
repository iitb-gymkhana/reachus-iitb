'use strict';

const Hapi = require('hapi');
const Boom = require('boom');
const mongoose = require('mongoose');
const glob = require('glob');
const path = require('path');



require('dotenv').config();

const SECRET = process.env.SECRET;
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_PORT = process.env.DB_PORT;

const dbUrl = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/SAC`;

const validate = async function (decoded, request) {
    return { isValid: true };
};

const init = async () => {
    const server = new Hapi.Server({
        port: 3000,
        host: 'localhost'
    });

    await server.register(require('hapi-auth-jwt2'));
    
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