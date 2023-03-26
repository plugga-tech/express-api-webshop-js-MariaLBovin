import createOrder from "./orderfunctions.js";

const loginFields = document.querySelector('.loginfields')
const greeting = document.querySelector('.greeting-p');
const sumPlacement = document.querySelector('.totalamount');
const createUserFields = document.querySelector('.create-user');

export function createOrderBtn() {
    console.log(sumPlacement);
    const orderBtn = document.createElement("button");
    orderBtn.innerText = 'beställ';
    sumPlacement.appendChild(orderBtn);
    orderBtn.addEventListener("click", createOrder);
}

export function createUser () {
    const nameInput = document.createElement('input');
    const emailInput = document.createElement('input');
    const passwordInput = document.createElement('input');
    const createBtn = document.createElement('button');
    nameInput.placeholder = 'Förnamn, Efternamn';
    emailInput.placeholder = 'Emailadress';
    passwordInput.placeholder = 'Lösenord';
    createBtn.innerText = 'Skapa konto';

    createUserFields.append(nameInput, emailInput, passwordInput, createBtn)

    nameInput.innerHTML = '';
    emailInput.innerHTML = '';
    passwordInput.innerHTML = '';

    createBtn.addEventListener('click', () => {
        let createdUser = {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value
        }

        fetch('http://localhost:3000/api/users/add', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(createdUser)
            })
            .then(res => res.json())
            .then(data => {
                //console.log(data)

        })
    })
    // if (loggedInUser) {
    //     createUserFields.classList.remove('create-user');
    // }
}

export function createLogin () {
    const usernameInput = document.createElement('input');
    const passwordInput = document.createElement('input');
    const loginBtn = document.createElement('button');
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
                //console.log(data)
                if(data.email){
                    greeting.innerText = 'Välkommen ' + data.name;
                    localStorage.setItem('User', JSON.stringify(data));
                    //loginFields.classList.add('display-none');
                    //createUserFields.classList.add('display-none');
                    createOrderBtn();
                    //console.log(createOrderBtn)
                }else {
                    greeting.innerText = 'Något gick fel, var god försök igen.'
                }
                
                ;
            })
    })
    usernameInput.innerHTML = '';
    passwordInput.innerHTML = '';
    loginFields.append(usernameInput, passwordInput,loginBtn);

}

export default createLogin; createUser; ;