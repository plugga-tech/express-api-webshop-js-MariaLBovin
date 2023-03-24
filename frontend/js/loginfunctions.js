import createOrder from "./orderfunctions.js";
const loginPlacement = document.querySelector('.login-section');

export function createUser () {
    const nameInput = document.createElement('input');
    const emailInput = document.createElement('input');
    const passwordInput = document.createElement('input');
    const createBtn = document.createElement('button');

    nameInput.placeholder = 'Förnamn, Efternamn';
    emailInput.placeholder = 'Emailadress';
    passwordInput.placeholder = 'Lösenord';
    createBtn.innerText = 'Skapa konto';

        

    loginPlacement.append(nameInput, emailInput, passwordInput, createBtn)

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
                console.log(data)

        })
        
        nameInput.innerHTML = '';
        emailInput.innerHTML = '';
        passwordInput.innerHTML = '';
    })
}

export function createLogin () {
    const usernameInput = document.createElement('input');
    const passwordInput = document.createElement('input');
    const loginBtn = document.createElement('button');
    const greeting = document.createElement('p');
    const orderBtn = document.createElement("button");
    orderBtn.innerText = "Beställ";
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
                }else {
                    greeting.innerText = 'Något gick fel, var god försök igen.'
                }
                
                ;
            })
    })
    usernameInput.innerHTML = '';
    passwordInput.innerHTML = '';
    orderBtn.addEventListener("click", createOrder);
    loginPlacement.append(usernameInput, passwordInput, loginBtn, greeting, orderBtn);

}

export default createLogin; createUser;