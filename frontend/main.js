import  createLogin  from "./js/loginfunctions.js";
import { createUser } from "./js/loginfunctions.js";
import  printProducts from "./js/productfunctions.js";


function init () {
    createLogin ();
    createUser ();
    printProducts ()
};

init ();