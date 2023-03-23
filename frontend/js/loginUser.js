const loginPlacement = document.querySelector('.login-section');

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
                
                ;
            })
    })
    usernameInput.innerHTML = '';
    passwordInput.innerHTML = '';
    loginPlacement.append(usernameInput, passwordInput, loginBtn, greeting);

}
createLogin();