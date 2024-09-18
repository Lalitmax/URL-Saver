const submitButton = document.querySelector('.submit-button');
let userDetails = {}
submitButton.onclick = (e) => {
    e.preventDefault();
    const email = document.querySelector('#userName').value;
    const password = document.querySelector('#password').value;

    const existingUser = localStorage.getItem("userDetails");
    console.log('wow')

    if (existingUser) {
        const parsedUser = JSON.parse(existingUser);
        if (parsedUser.email == email && parsedUser.password == password) {
            document.querySelector('#userName').value = "";
            document.querySelector('#password').value = "";
            localStorage.setItem("isLogged", "true");
            window.location.href = '/index.html';

        } else {
            alert("email or password is wrong");

        }
    } else {
        alert("email or password is wrong");
    }






}