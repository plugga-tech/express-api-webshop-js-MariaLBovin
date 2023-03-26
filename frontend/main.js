
import  printProducts from "./js/productfunctions.js";
import { createOrderBtn } from "./js/loginfunctions.js";
import { createUser } from "./js/loginfunctions.js";
import createLogin from "./js/loginfunctions.js";
import { createViewAllOrdersBtn } from "./js/orderfunctions.js";

const loginFields = document.querySelector('.loginfields')
const greeting = document.querySelector('.greeting-p');
const sumPlacement = document.querySelector('.totalamount');
const createUserFields = document.querySelector('.create-user');


let loggedInUser = JSON.parse(localStorage.getItem('User'));


if(loggedInUser){
    createOrderBtn();
    createViewAllOrdersBtn();
    console.log(createOrderBtn)
    greeting.innerText ='Välkommen ' + loggedInUser.name;
    loginFields.classList.add('display-none');
    createUserFields.classList.add('display-none')
} else {
    createUser();
    createLogin();
    console.log(createUser, createLogin);
    createUserFields.classList.remove('display-none')
    loginFields.classList.remove('display-none')
}

printProducts();
// function init () {
//     console.log('test')
//     //createUser ();
//     printProducts ();
//     //createOrderBtn();
// };

// init ();