var express = require('express');
var router = express.Router();
const OrdersModel = require('../models/order-model');

/* GET users listing. */
router.get('/', async(req, res, next) =>{
  res.send('order');
});

//skapa order för specifik user
router.post('/add', async (req,res) => {
    let newOrder = await OrdersModel.create(req.body)
    console.log(newOrder)
    res.status(201).json(newOrder);

})

//hämta alla orders
router.get('/all', async (req, res) => {
    const orders = await OrdersModel.find();
    res.json(orders);
})

module.exports = router;