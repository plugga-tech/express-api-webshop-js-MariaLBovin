import { addItemToCart } from "./cartfunctions.js";
const productPlacement = document.querySelector('.products-div');
const filterBtnPlacement = document.querySelector('.filter-buttons');




function createFilterBtns () {
    const knittedBtn = document.createElement('button');
    knittedBtn.innerText = 'Stickat';
    const crochetBtn = document.createElement('button');
    crochetBtn.innerText = 'Virkat';
    const craftBtn = document.createElement('button');
    craftBtn.innerText = 'Hemslöjd';
    //const allBtn = document.createElement('button');
    //allBtn.innerText = 'Alla produkter';


    filterBtnPlacement.append(knittedBtn, crochetBtn, craftBtn, );

    knittedBtn.addEventListener('click', viewKnitted);
    crochetBtn.addEventListener('click', viewCrochet);
    craftBtn.addEventListener('click', viewCraft);
    //allBtn.addEventListener('click', );
}

function printProducts () {
    fetch('http://localhost:3000/api/products/',)
    .then(res => res.json())
    .then (products =>  {
        //console.log(products)

    const productList = document.createElement('ul');
    productPlacement.appendChild(productList);

    const categoryName = document.createElement('h2');
    productList.appendChild(categoryName);
    
    products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <h4>${product.price} kr</h4>
        <img src='https://placebear.com/200/300'/>
        <button class='order-btn' id='${product._id}'>Lägg i varukorg</button>

        `
        productList.appendChild(listItem);
    
        })

        productList.addEventListener('click', (e) => {
            //console.log(e.target.id)
            addItemToCart(e.target.id)  
        })
    });
    createFilterBtns();
}



function viewKnitted () {
    productPlacement.innerHTML ='';
    fetch('http://localhost:3000/api/products/category/641ebd18e9d250f5ac626a55',)
    .then(res => res.json())
    .then (products =>  {
        //console.log(products)

    const productList = document.createElement('ul');
    productPlacement.appendChild(productList);

    const categoryName = document.createElement('h2');
    productList.appendChild(categoryName);
    
    products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <h4>${product.price} kr</h4>
        <img src='https://placebear.com/200/300'/>
        <button class='order-btn' id='${product._id}'>Lägg i varukorg</button>

        `
        productList.appendChild(listItem);
    
        })

        productList.addEventListener('click', (e) => {
            ////console.log(e.target.id)
            addItemToCart(e.target.id)  
        })
    });
    
}

function viewCrochet () {
    productPlacement.innerHTML ='';
    fetch('http://localhost:3000/api/products/category/641ebd23e9d250f5ac626a57',)
    .then(res => res.json())
    .then (products =>  {
        //console.log(products)

    const productList = document.createElement('ul');
    productPlacement.appendChild(productList);

    const categoryName = document.createElement('h2');
    productList.appendChild(categoryName);
    
    products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <h4>${product.price} kr</h4>
        <img src='https://placebear.com/200/300'/>
        <button class='order-btn' id='${product._id}'>Lägg i varukorg</button>

        `
        productList.appendChild(listItem);
    
        })

        productList.addEventListener('click', (e) => {
            ////console.log(e.target.id)
            addItemToCart(e.target.id)  
        })
    });
    
}

function viewCraft () {
    productPlacement.innerHTML ='';
    fetch('http://localhost:3000/api/products/category/641ebd32e9d250f5ac626a59',)
    .then(res => res.json())
    .then (products =>  {
        //console.log(products)

    const productList = document.createElement('ul');
    productPlacement.appendChild(productList);

    const categoryName = document.createElement('h2');
    productList.appendChild(categoryName);
    
    products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <h4>${product.price} kr</h4>
        <img src='https://placebear.com/200/300'/>
        <button class='order-btn' id='${product._id}'>Lägg i varukorg</button>

        `
        productList.appendChild(listItem);
    
        })

        productList.addEventListener('click', (e) => {
            ////console.log(e.target.id)
            addItemToCart(e.target.id)  
        })
    });
    
}


export default printProducts;