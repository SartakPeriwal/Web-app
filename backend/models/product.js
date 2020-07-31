const mongoose = require('mongoose');

let Product = new mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    quantity: {
        type: Number,
        required: true

    },
    price: {
        type: Number,
        required: true
    },
    vendorid: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true
    }

});

module.exports = mongoose.model('Product', Product);