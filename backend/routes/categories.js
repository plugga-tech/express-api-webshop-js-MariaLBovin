var express = require('express');
const categoryModel = require('../models/category-model');
const { ObjectId } = require('mongodb');
var router = express.Router();
// const cors = require('cors');
// router.use(cors());

router.get('/', async(req, res) =>{
    const categories = await categoryModel.find()
    //console.log(categories.token)
    res.send(categories);
  });


router.post('/add', async (req, res) => {
    const newCategory = await categoryModel.create(req.body)
    //console.log(newCategory.token);

    if (newCategory.token === "1234key1234"){
        res.send(newCategory)
    } else {
        res.status(401).json('Du har inte behörighet att göra den ändringen')
    }
    
})
  module.exports = router;