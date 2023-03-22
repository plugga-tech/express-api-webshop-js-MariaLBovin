const productPlacement = document.querySelector('.product-section');
console.log(productPlacement)

function printProducts () {
    fetch('http://localhost:3000/api/products')
    .then(res => res.json())
    .then (products =>  {
        console.log(products)

    const productList = document.createElement('ul');
    productPlacement.appendChild(productList);
    
    products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <p>${product.name}</p>
        <p>${product.description}</p>
        <p>${product.price}</p>
        `
        productList.appendChild(listItem);
        
    });
    })

    
}
printProducts();