'use strict';
const router = require('express').Router();
const db = require('../db')
//Iterate through the routes object and mount the mounts
let _registerRoutes = (routes, method) => {
    for (let key in routes) {
        if (typeof routes[key] === 'object' && routes[key] !== null && !(routes[key] instanceof Array)) {

            console.log(routes[key])
            _registerRoutes(routes[key], key);
        } else {
            //register the routers
            if (method === 'get') {
                router.get(key, routes[key])
            } else if (method === 'post') {
                router.post(key, routes[key])
            } else {
                router.use(routes[key])
            }
        }
    }
}

let route = routes => {
    _registerRoutes(routes);
    return router;
}

//find a single user based on a key

let findOne = profileID => {
    return db.userModel.findOne({
        'profileId': profileID
    })
}

//create a new user and returns that instance
let isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.redirect('/login');
    } else {
        return next();
    }
}
let createNewUser = profile => {
    return new Promise((resolve, reject) => {
        let newChatUser = new db.userModel({
            profileId: profile.id,
            fullName: profile.displayName,
            profilePic: profile.photos[0].value || ''
        });

        newChatUser.save(error => {
            if (error) {
                console.log('Create New User Error');
                reject(error)
            } else {
                resolve(newChatUser)
            }
        })
    })
}

let findById = id => {
    return new Promise((resolve, reject) => {
        db.userModel.findById(id, (error, user) => {
            if (error) {
                reject(error);
            } else {
                resolve(user);
            }
        })
    })
}
module.exports = {
    route: route,
    findOne: findOne,
    createNewUser: createNewUser,
    findById: findById,
    isAuthenticated: isAuthenticated
}