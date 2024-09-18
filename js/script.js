import urls from './data.js';

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.right-menu');
let ulOuter = document.querySelector(".urls");
let closeDialog = document.querySelector('.close-dialog');
let btnSave = document.querySelector('.openUrlSaveDialog');
let btnSubmit = document.querySelector('#menu-icon');
let profile = document.querySelector('.profile');

// Toggle menu icon and navbar
btnSubmit.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

 

btnSave.onclick = function () {
    const isLogged = localStorage.getItem("isLogged");
    if (isLogged == 'true') {
        console.log('d')
        const modal = document.querySelector('.dialgue');
        modal.classList.remove('activeDialogClose');
        modal.classList.toggle('activeDialog');
    } else {
        alert("Login first");
    }


}

closeDialog.onclick = function () {
    const modal = document.querySelector('.dialgue');
    modal.classList.remove('activeDialog');
    modal.classList.add('activeDialogClose');

}

// Show all URLs
function showAllUrls() {
    const allTags = urls.map(url => {
        return `<ul class="ul-outer">
                    <li>${url.url} <button>Copy</button></li>
                </ul>`;
    }).join("");
    ulOuter.innerHTML = allTags;
}

// Handle user login
function loginFunc() {
    const isLogged = localStorage.getItem("isLogged");
    if (isLogged === "true") {
        const parentElement = document.querySelector('.sign-dark');
        const existingLoginElement = document.querySelector('.login');

        // Remove the existing element if it exists
        if (existingLoginElement) {
            existingLoginElement.remove();
        }

        const userDetails = localStorage.getItem("userDetails");
        console.log(userDetails);

        let userData = JSON.parse(userDetails);
        let nameArr = userData.name.split(" ");
        let firstName = nameArr[0].charAt(0);
        let lastName = nameArr.length > 1 ? nameArr[1].charAt(0) : '';

        // Create new login button
        const newLoginButton = document.createElement('button');
        newLoginButton.innerText = firstName + (lastName ? " " + lastName : "");
        newLoginButton.classList.add('login', 'loggedBtn');
        newLoginButton.style.height = "50px";
        newLoginButton.style.width = "50px";
        newLoginButton.style.borderRadius = "50px";
        newLoginButton.style.background = "linear-gradient(90deg, #020024 0%, rgb(33, 57, 101) 60%, var(--main-color) 100%)";
        newLoginButton.style.border = "1px solid white";
        newLoginButton.style.color = "white";
        newLoginButton.style.cursor = "pointer";
        newLoginButton.style.boxShadow = "none";

        // Append the new button to the parent element
        parentElement.appendChild(newLoginButton);
        addLoggedBtnClickHandler(newLoginButton); // Add event handler
    }
}


function handleLoggedBtnClick() {
    profile.classList.toggle('active2');
}


profile.onclick = () => {
    localStorage.setItem('isLogged', 'false');
    window.location.href = '/index.html';
}


function addLoggedBtnClickHandler(button) {
    button.onclick = handleLoggedBtnClick;
}

loginFunc();
showAllUrls();

export default { showAllUrls, loginFunc };
