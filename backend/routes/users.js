var express = require('express');
var router = express.Router();
const UserModel = require('../models/user-model');
const CryptoJS = require('crypto-js');
const cors = require('cors');
const { ObjectId } = require('mongodb');
router.use(cors ());



//ska hämta alla användares namn, email och id. INTE LÖSENORD
router.get('/', async (req, res) => {
  const users = await UserModel.find({}).select('name email');
  console.log(users)
  res.json(users);
});

//hämtar unik användare
router.post('/', async (req, res, next) => {
  const user = await UserModel.findOne({})
    res.json(user)
  })


//ska skapa en user
router.post('/add', async (req,res) =>{ 
  //console.log(req.body)
  let newUser = {name: req.body.name, email: req.body.email};
  let newPassword = CryptoJS.SHA3(req.body.password).toString();
  newUser.password = newPassword;

  const saveUser = await UserModel.create(newUser)
  console.log(saveUser);
  res.send(saveUser)
});

//loggar in användare
router.post('/login', async (req,res) => {
  const {email, password} = req.body;
  console.log(email, password)

  const loggedinUser = await UserModel.findOne({email: email})
  console.log(loggedinUser);

  if(CryptoJS.SHA3(password).toString() === loggedinUser.password){
    res.json({email: loggedinUser.email, id: loggedinUser._id})
  } else {
    res.status(401)
  }
  return;
})



module.exports = router;
