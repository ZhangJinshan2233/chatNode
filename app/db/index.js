'use strict';
const config = require('../config');
const mongoose = require('mongoose');
const connection = mongoose.connection;
mongoose.connect(config.dbURI, {
    socketTimeoutMS: 3000000,
    keepAlive: 3000000,
    useNewUrlParser: true,
    autoIndex: false
})
connection.on('error', function (err) {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit();
})
//log an error if connection fails
connection.on('open', function () {
    console.log('MongoDB database connection established successfully!');
});
//create a schema that defines the structure for storing user datas
const chatUser = new mongoose.Schema({
    profileId: String,
    fullName: String,
    profilePic: String
})

//turn the schema into a useable model

let userModel = mongoose.model('chatUser', chatUser)

module.exports = {
    userModel: userModel
}