const productPlacement = document.querySelector('.product-section');
const loginPlacement = document.querySelector('.login-section');
const shoppingCartPlacement = document.querySelector('.shoppingcart-section');
const renderdCartPlacement = document.querySelector('.rendered-cart-section')
//let itemsInCart = JSON.parse(localStorage.getItem('Cart')) ||  [];
//updateCart();
let itemsInCart = [];


console.log(productPlacement, loginPlacement, shoppingCartPlacement, renderdCartPlacement)

function createLogin () {
    const usernameInput = document.createElement('input');
    const passwordInput = document.createElement('input');
    const loginBtn = document.createElement('button');
    const greeting = document.createElement('p');
    usernameInput.placeholder = 'Emailadress';
    passwordInput.placeholder = 'Lösenord';
    loginBtn.innerText = 'Logga in';
    
    loginBtn.addEventListener('click', () => {
    
        let loginUser = {
            email: usernameInput.value,
            password: passwordInput.value
        }
        //console.log(loginUser);
    
        fetch('http://localhost:3000/api/users/login', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(loginUser)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.email){
                    
                    greeting.innerText = 'Välkommen ' + data.name;
                    localStorage.setItem('User', data.name);
                }else {
                    greeting.innerText = 'Något gick fel, var god försök igen.'
                }
                
                ;
            })
    })
    usernameInput.innerHTML = '';
    passwordInput.innerHTML = '';
    loginPlacement.append(usernameInput, passwordInput, loginBtn, greeting);

}
    
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

}

function renderCartItems() {
    console.log(itemsInCart);
    const cartItems = document.createElement("ul");
    const orderBtn = document.createElement("button");
    orderBtn.innerText = "Beställ";
  
    renderdCartPlacement.innerHTML = "";
    renderdCartPlacement.append(cartItems, orderBtn);
  
    itemsInCart.forEach((product) => {
      const itemsList = document.createElement("li");
      itemsList.innerHTML += `
        <p>${product.name}</p>
        <p>${product.description}</p>
        <p>${product.price} kr</p>
        <img src='https://placebear.com/200/300'>
        <button id="increase-${product._id}" class="increase">+</button>
        <p class="amount" id="amount-${product._id}">${product.quantity}</p>
        <button id="decrease-${product._id}" class="decrease">-</button>
        <p class="totalamount">Summa</p>
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
  
    itemsInCart.forEach((product) => {
      const amountEl = document.getElementById(`amount-${product._id}`);
      amountEl.textContent = product.quantity;
    });

    const sumPlacement = document.querySelector('.totalamount');
    console.log(sumPlacement)
    let totalPrice = 0;
    let totalItems = 0;
    itemsInCart.forEach((item) => {
        totalPrice += item.price * item.quantity;
        totalItems += item.quantity
    });
    sumPlacement.innerHTML = `Antal ${totalItems} Summa ${totalPrice}`

    //localStorage.setItem('Cart', JSON.stringify(itemsInCart));

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
    //console.log('test');
    let order = {
        user: 'test',
        products: [
            itemsInCart
            //productQuantity.quantity
        ],
    }
    //console.log(order)
    fetch('http://localhost:3000/api/orders/add', {
        method: "POST",
        headers: {
                "Content-type": "application/json"
                },
        body: JSON.stringify({user: order.user, products: order.products[itemsInCart._id, itemsInCart.quantity]})
        })
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })

}

createLogin();
printProducts();
