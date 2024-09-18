const submitButton = document.querySelector('.submit-button');
let userDetails = {}
submitButton.onclick = (e) => {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    const existingUser = localStorage.getItem("userDetails");

    if (existingUser) {
        const parsedUser = JSON.parse(existingUser);
        if (parsedUser.email == email) {
            alert("User Already exist");
            document.querySelector('#name').value = "";
            document.querySelector('#email').value = "";
            document.querySelector('#password').value = "";
            return;

        }   
    }

    userDetails = { name, email, password }
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    localStorage.setItem("isLogged","true");
 
    window.location.href = '/index.html';


}