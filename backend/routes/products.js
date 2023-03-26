var express = require('express');
var router = express.Router();
const ProductModel = require('../models/product-model');
const { ObjectId } = require('mongodb');
const cors = require('cors');


router.use(cors ());

/* GET users listing. */
//router.get('/', function(req, res, next) {
  //res.send('products');
//});

//Hämta alla produkter
router.get('/', async (req, res) => {
  const products = await ProductModel.find().populate('category');
  //console.log(products)
  res.json(products);
});

//hämta specifik produkt

router.get('/:productId', async (req, res) => {
  productId = req.params.productId
  
  const product = await ProductModel.findOne({"_id": new ObjectId(productId)}).populate('category')
    res.json(product)
  })

// hämta produkter från specifik kategori
router.get('/category/:id', async (req, res) => {
  const categoryId = req.params.id
  
  const category = await ProductModel.find({category: categoryId}).populate('category')
    //console.log(category)
    res.json(category)
  })
  
//lägger till nya produkter
router.post('/add', async (req,res) =>{ 
  const token = req.body.token

  if(token === '1234key1234') {
    let newProduct = await ProductModel.create(req.body);
  //console.log(newProduct);
  res.send(newProduct)
  } else {
    res.status(400).json('Du har inte behörighet att göra den ändringen')
  }
  
});


module.exports = router;
