'use strict';
const session = require('express-session');

const MongoStore = require('connect-mongo')(session);

const config = require('../config');

const db=require('../db')

if (process.env.NODE_ENV === 'product') {

    //initialize session with setting for production
    module.exports = session({
        secret: config.sessionSecret,
        resave: false,
        saveUninitialized: false,
        store:new MongoStore({
            mongooseConnection:db.Mongoose.connection
        })
    })
} else {

    //initialize session with setting for dev
    module.exports = session({
        secret: config.sessionSecret,
        resave: false,
        saveUninitialized: true
    })
}