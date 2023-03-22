const productPlacement = document.querySelector('.product-section');
const loginPlacement = document.querySelector('.login-section');

console.log(productPlacement, loginPlacement)

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
                    //localStorage.setItem(data.name);
                }else {
                    greeting.innerText = 'Något gick fel, var god försök igen.'
                }
                
                printProducts();
            })
    })
    //usernameInput.innerHTML = '';
    //passwordInput.innerHTML = '';
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
        <button class='order-btn'>Beställ</button>

        `
        productList.appendChild(listItem);

        const orderBtns = document.querySelectorAll('.order-btn');
        console.log(orderBtns);
        orderBtns.forEach(btn => {
            btn.addEventListener('click',function()  {
                console.log('tst')
            })
        })
    });
    })

}

createLogin();
