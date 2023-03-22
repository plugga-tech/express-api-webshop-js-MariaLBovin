var express = require('express');
var router = express.Router();
const ProductModel = require('../models/product-model');
const cors = require('cors');

router.use(cors ());

/* GET users listing. */
//router.get('/', function(req, res, next) {
  //res.send('products');
//});

//Hämta alla produkter
router.get('/', async (req, res) => {
  const products = await ProductModel.find();
  //console.log(products)
  res.json(products);
});

//hämta specifik produkt

router.get('/:productId', async (req, res, next) => {
  const product = await ProductModel.findOne({})
    res.json(product)
  })
  
//lägger till nya produkter
router.post('/add', async (req,res) =>{ 
  //console.log(req.body)
  let newProduct = new ProductModel(req.body);
  await newProduct.save();
  //console.log(newProduct);
  res.send(newProduct)
});


module.exports = router;
