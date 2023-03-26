const mongoose = require('mongoose');

const { Schema} = mongoose


const OrderSchema = new Schema({
    user: {
        type: String, 
        required: true
    },
    products: [{
        productId: {
            type: mongoose.Types.ObjectId,
            ref: 'products',
            required: true
        },
        quantity: {
            type: Number, 
            required: true
        }
    }],
    

})

module.exports = mongoose.model('order', OrderSchema)