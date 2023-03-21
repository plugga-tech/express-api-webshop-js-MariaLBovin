const mongoose = require('mongoose');

const productSchema = mongoose.Schema;

const newProduct = new productSchema({
    name: String,
    description: String,
    price: Number,
    lager: Number,

})

module.exports = mongoose.model('products', newProduct)