var express = require('express');
var router = express.Router();
const OrdersModel = require('../models/order-model');
const ProductModel = require('../models/product-model');
const cors = require('cors');
router.use(cors());

/* GET orders listing. */
router.get('/', async(req, res, next) =>{
  res.send('order');
});

//skapa order för specifik user
router.post('/add', async (req,res) => {
    const orders = await OrdersModel.create(req.body);
    //console.log(orders.user)
    const products = orders.products
    //console.log(products)
    

    products.forEach(async ({productId, quantity}) => {
        //console.log({productId, quantity})
        const product = await ProductModel.findById({_id: productId});
        //console.log(product)
        if (product){
        product.lager -= quantity;
        await product.save();
        }
        });

  res.json(orders)
});


//hämta alla orders
router.get('/all/:token', async (req, res) => {
    const token = req.params.token;

    if(token === '1234key1234'){
      const orders = await OrdersModel.find();
      res.json(orders);
    } else {
      res.status(401).json('Du har inte åtkomst')
    }
    
})

router.post('/user', async (req, res,) => {
    const token = req.body.token;

    if(token === '1234key1234'){
      const userOrder = await OrdersModel.findOne({}).populate('products')
      res.json(userOrder)
    } else {
      res.status(401).json('Du har inte åtkomst')
    }

  
})

// router.post('/userOrder', async (req, res) => {
//   const order = await OrdersModel.findOne({}).populate('products')

//   res.json(order);
// })



module.exports = router;