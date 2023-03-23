const productPlacement = document.querySelector('.product-section');

const shoppingCartPlacement = document.querySelector('.shoppingcart-section');
let itemsInCart = [];

//console.log(productPlacement, loginPlacement, shoppingCartPlacement)


    
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
        <p>${product.name}</p>
        <p>${product.description}</p>
        <p>${product.price} kr</p>
        <img src='https://placebear.com/200/300'>
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

function addItemToCart (productId){
    //console.log(productId);
    fetch('http://localhost:3000/api/products/' + productId)
    .then(res => res.json ())
    .then (data => {
        //console.log(data);

        const item = data
        //console.log(item)
        itemsInCart.push({
            ...item,
            quantity: 1,
        });
        updateCart();
    })
    //console.log(itemsInCart);
    
}

function updateCart (){
    renderCartItems ();
    //renderCartTotal ();
}



function renderCartItems() {
    console.log(itemsInCart);
    const cartItems = document.createElement("ul");
    const orderBtn = document.createElement("button");
    orderBtn.innerText = "Beställ";
  
    shoppingCartPlacement.innerHTML = ""; // clear previous content
    shoppingCartPlacement.append(cartItems, orderBtn);
  
    itemsInCart.forEach((product) => {
      const itemsList = document.createElement("li");
      itemsList.innerHTML = `
        <p>${product.name}</p>
        <p>${product.description}</p>
        <p>${product.price} kr</p>
        <img src='https://placebear.com/200/300'>
        <button id="increase-${product._id}" class="increase">+</button>
        <p class="amount" id="amount-${product._id}">${product.quantity}</p>
        <button id="decrease-${product._id}" class="decrease">-</button>
      `;
  
      cartItems.appendChild(itemsList);
  
      const increaseBtn = document.getElementById(`increase-${product._id}`);
      increaseBtn.addEventListener("click", () => {
        changeNumber("plus", product._id);
      });
  
      const decreaseBtn = document.getElementById(`decrease-${product._id}`);
      decreaseBtn.addEventListener("click", () => {
        changeNumber("minus", product._id);
      });
    });
  
    orderBtn.addEventListener("click", createOrder);
  
    // update the quantity of each item in the cart
    itemsInCart.forEach((product) => {
      const amountEl = document.getElementById(`amount-${product._id}`);
      amountEl.textContent = product.quantity;
    });
  }
  
  function changeNumber(action, productId) {
    //console.log(action, productId);
    itemsInCart = itemsInCart.map((item) => {
        let firstValue = item.quantity;
        //console.log(firstValue);

        if(item._id === productId){
            //console.log(item._id)
            if(action === 'minus'){
                //console.log(action)
                firstValue--
            }else if (action === 'plus'){
                //console.log(action)
                firstValue++
           }
        }
        return {
            ...item,
            quantity: firstValue
        };
    })
    updateCart();
  }

function createOrder () {
    console.log('test');
    let order = {
        user: 'test',
        products: [
            itemsInCart
        ]
    }
    console.log(order)
    fetch('http://localhost:3000/api/orders/add', {
        method: "POST",
        headers: {
                "Content-type": "application/json"
                },
        body: JSON.stringify(order)
        })
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })

}

createLogin();
printProducts();
