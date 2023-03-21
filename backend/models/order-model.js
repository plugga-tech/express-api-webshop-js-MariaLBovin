const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema;

const newOrder = new OrderSchema({
    user: {type: String},
    products: [{
        productId: {
            type:[mongoose.Types.ObjectId],
            ref: 'products',
            //required: true
        },
        quantity: {type: Number}
    }],
    

})

module.exports = mongoose.model('orders', newOrder)