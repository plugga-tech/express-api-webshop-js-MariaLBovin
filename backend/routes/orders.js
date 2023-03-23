var express = require('express');
var router = express.Router();
const OrdersModel = require('../models/order-model');
const ProductModel = require('../models/product-model');
const cors = require('cors');
router.use(cors);

/* GET users listing. */
router.get('/', async(req, res, next) =>{
  res.send('order');
});

//skapa order för specifik user
router.post('/add', async (req,res) => {
    const orders = await OrdersModel.create(req.body);
    console.log(orders.products)
    const products = orders.products

    products.forEach(async ({productId, quantity}) => {
        //console.log({productId, quantity})
        const product = await ProductModel.findById({_id: productId});
        //console.log(product)
        if (product){
        product.lager -= quantity;
        await product.save();
        }
        });
});


//hämta alla orders
router.get('/all', async (req, res) => {
    const orders = await OrdersModel.find().populate('products');
    res.json(orders);
})

module.exports = router;