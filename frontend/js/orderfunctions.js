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
        ordersPlacement.innerText = 'Tack för din beställning'
    })
    
    viewAllOrders();
}

function viewAllOrders () {
    let userObject = localStorage.getItem('User');
    let userId = userObject.id
    

    //console.log(userId);

    fetch('http://localhost:3000/api/orders/userOrder', {
        method: "POST",
        headers: {
                "Content-type": "application/json"
                },
        body: JSON.stringify(userId)
        })
    .then(res => res.json())
    .then(data => {
        //console.log({productId: data._id})
        let productId = {productId: data._id}

    })
    
}


export default createOrder;