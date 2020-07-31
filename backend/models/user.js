const mongoose = require('mongoose');

let User = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true

    },
    password: {
        type: String,
        required: true

    },
    iscustomer:{
        required: true,
        type: Boolean
    }

});

module.exports = mongoose.model('User', User);