const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema;

const newOrder = new OrderSchema({
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

module.exports = mongoose.model('orders', newOrder)