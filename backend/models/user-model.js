const mongoose = require('mongoose');

const userSchema = mongoose.Schema;

const newUser = new userSchema({
    name: String,
    email: String,
    password: String,

})

module.exports = mongoose.model('users', newUser)