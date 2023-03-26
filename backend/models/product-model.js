const mongoose = require('mongoose');

const { Schema } = mongoose

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    lager: {
        type: Number,
        required: true
    },
    category:{
        type: mongoose.Types.ObjectId,
        ref: 'category',
    },

})

module.exports = mongoose.model('products', productSchema)