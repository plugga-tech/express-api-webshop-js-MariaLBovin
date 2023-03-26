const ordersPlacement = document.querySelector('.orders-section');

export function createOrder () {
    //console.log('test');
    let userObject = JSON.parse(localStorage.getItem('User'));
    //console.log(userObject)
    //console.log(userObject.id)
    let productsArray = JSON.parse(localStorage.getItem('Cart'));
    //console.log(productsArray)
    let orderProductArray = []

    productsArray.forEach((product) => {
        const newProduct = {productId: product._id, quantity: product.quantity};
        orderProductArray.push(newProduct);
    });

    let order = {
        user: userObject.id,
        products: orderProductArray

    };

    //console.log(order)
    fetch('http://localhost:3000/api/orders/add', {
        method: "POST",
        headers: {
                "Content-type": "application/json"
                },
        body: JSON.stringify(order)
        })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        // data.forEach(order => {
        //     //console.log(order.products)
        //     const products = order.products
        //     products.forEach(product=> {
        //         console.log(product.productId.name)
        //         const productName = product.productId.name;
        //         console.log(productName)

        //     })

        // });
        
        ordersPlacement.innerText = 'Tack för din beställning'
    })
    
    ;
}
export function createViewAllOrdersBtn () {
    const viewOrdersBtn = document.createElement('button');
    viewOrdersBtn.innerText = 'se mina ordrar';
    ordersPlacement.appendChild(viewOrdersBtn)
    viewOrdersBtn.addEventListener('click', viewAllOrders)
}


function viewAllOrders () {
    let userObject = JSON.parse(localStorage.getItem('User'));
    let userId = {user: userObject.id}
    

    console.log(userId);

    fetch('http://localhost:3000/api/orders/userOrder', {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(userId)
      })
      .then(res => res.json())
      .then(data => {
        const productUl = document.createElement('ul')
        ordersPlacement.appendChild(productUl)
        console.log(productUl)
        data.forEach(order => {
            //console.log(order.products)
            const products = order.products
            products.forEach(product=> {
                const li = document.createElement('li');
                
                li.innerText = product.productId.name
                console.log(li.innerText)
                productUl.appendChild(li);
            //     //console.log(product.productId.name)
            //         ordersPlacement.innerHTML = `<p>${product.productId.name}</p>`
                
                
             })

        });
        
      });
    
}


export default createOrder; createViewAllOrdersBtn