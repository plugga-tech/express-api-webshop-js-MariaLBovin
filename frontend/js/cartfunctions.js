const renderdCartPlacement = document.querySelector('.rendered-cart-section')

let itemsInCart =  JSON.parse(localStorage.getItem('Cart')) || [];
updateCart();

export function addItemToCart (productId){
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

export function renderCartItems() {
    ////console.log(itemsInCart);
    const cartItems = document.createElement("ul");
    
    renderdCartPlacement.innerHTML = "";
    renderdCartPlacement.append(cartItems);
  
    itemsInCart.forEach((product) => {
      const itemsList = document.createElement("li");
      itemsList.innerHTML += `
        <h3>${product.name}</h3>
        <div>${product.description}</div>
        <p>${product.price} kr</p>
        <img src='https://placebear.com/200/300'>
        <button id="increase-${product._id}" class="increase">+</button>
        <p class="amount" id="amount-${product._id}">${product.quantity}</p>
        <button id="decrease-${product._id}" class="decrease">-</button>
      `;
  
      cartItems.appendChild(itemsList);
  
      const increaseBtn = document.getElementById(`increase-${product._id}`);
      increaseBtn.addEventListener("click", () => {
        changeValue("plus", product._id);
      });
  
      const decreaseBtn = document.getElementById(`decrease-${product._id}`);
      decreaseBtn.addEventListener("click", () => {
        changeValue("minus", product._id);
      });
    });
  
    localStorage.setItem('Cart', JSON.stringify(itemsInCart));
    
    //renderTotalSum();

  }
function updateCart () {
  renderCartItems();
  renderTotalSum ();
}

function renderTotalSum () {
  const sumPlacement = document.querySelector('.totalamount');
  //console.log(sumPlacement)
  let totalPrice = 0;
  let totalItems = 0;
  itemsInCart.forEach((item) => {
      totalPrice += item.price * item.quantity;
      totalItems += item.quantity
  });
  sumPlacement.innerHTML = `Antal ${totalItems} Summa ${totalPrice}`

}

export function changeValue(action, productId) {
    //console.log(action, productId);
    itemsInCart = itemsInCart.map((item) => {
        let firstValue = item.quantity;
        let stock = item.lager
        //console.log(firstValue, stock);

        if(item._id === productId ){
            //console.log(item._id)
            if(action === 'minus' && firstValue > 0){
                //console.log(action)
                firstValue--
            }else if (action === 'plus' && firstValue < stock){
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

export default addItemToCart; renderCartItems; changeValue