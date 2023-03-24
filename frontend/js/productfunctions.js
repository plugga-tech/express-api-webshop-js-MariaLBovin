import { addItemToCart } from "./cartfunctions.js";
const productPlacement = document.querySelector('.product-section');

function printProducts () {
    fetch('http://localhost:3000/api/products')
    .then(res => res.json())
    .then (products =>  {
        //console.log(products)

    const productList = document.createElement('ul');
    productPlacement.appendChild(productList);
    
    products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <h3>${product.name}</h3>
        <div>${product.description}</div>
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
    
}

export default printProducts;