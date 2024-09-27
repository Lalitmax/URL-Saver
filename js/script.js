// import urls from './data.js';

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.right-menu');
let ulOuter = document.querySelector(".urls");
let closeDialog = document.querySelector('.close-dialog');
let btnSave = document.querySelector('.openUrlSaveDialog');
let btnSubmit = document.querySelector('#menu-icon');
let profile = document.querySelector('.profile');
let urlOuter = document.querySelector('.ul-outer');
let removeUrl = document.querySelector('.remove-url');
let urlsData = JSON.parse(localStorage.getItem('urls'));

let serachUrls = document.querySelector('.find-urls');
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
    removeUrl.style.color = "white";

    if (btnSave.style.color === "rgb(162, 184, 238)") {
        btnSave.style.color = "white";
    } else {
        btnSave.style.color = "rgb(162, 184, 238)";
    }


}

closeDialog.onclick = function () {
    const modal = document.querySelector('.dialgue');

    modal.classList.remove('activeDialog');
    modal.classList.add('activeDialogClose');
    btnSave.style.color = "white";



}


removeUrl.onclick = function () {
    // Select all edit and copy buttons
    const editBtns = document.querySelectorAll('.edit-btn');
    const copyBtns = document.querySelectorAll('.copy-btn');

    // Loop through each button and toggle classes
    editBtns.forEach(editBtn => {
        editBtn.classList.toggle('active-remove-btn');
    });

    copyBtns.forEach(copyBtn => {
        copyBtn.classList.toggle('active-copy-btn');
    });

    if (removeUrl.style.color === "rgb(162, 184, 238)") {
        removeUrl.style.color = "white";
    } else {
        removeUrl.style.color = "rgb(162, 184, 238)";
    }

}

// ************************************************************Search url******************************************************************


serachUrls.addEventListener('input', () => {
    const value = document.querySelector('.find-urls').value.toLowerCase();
    urlsData = JSON.parse(localStorage.getItem('urls'));
    let foundUrls = [];

    urlsData.map((item) => {
        let flag = false;

        const keywords = item.keywords.join(" ").toLowerCase();
        const url = item.url.toLowerCase();

        if (keywords.includes(value) || url.includes(value)) {
            flag = true;
        }

        if (flag) {
            foundUrls.push(item);
        }
    });

    showAllUrls(foundUrls);
});


// Show all URLs
function showAllUrls(urls) {
    const isLogged = localStorage.getItem("isLogged");

    if (urls && isLogged === 'true') {
        const allTags = urls.map((url) => {
            return `<ul class="ul-outer">
                    <li id="${url.id}">
                    <span class="url-name">${url.url.length > 35 ? url.url.slice(0, 35) + '...' : url.url}</span> 
                            <div class = "copy-remove-btn">
                                <button class = "copy-btn">Copy</button>
                                <button class = "edit-btn">Remove</button>
                            </div>
                        </li>
                    </ul>`;
        }).join("");


        ulOuter.innerHTML = allTags;

        // Select all .ul-outer elements and add the visible class after a delay
        setTimeout(() => {
            const ulElements = document.querySelectorAll('.ul-outer');
            ulElements.forEach(element => {
                element.classList.add('visible');
            });
        }, 200); // 200 ms delay

    }

}

// ***************************** Edit-btn******************************************

ulOuter.addEventListener('click', (e) => {
    const li = e.target.closest('li');// Get the closest li element

    if (e.target.classList.contains('edit-btn')) {
        console.log("Edit button clicked:", li.id, li.textContent);

        let urls = JSON.parse(localStorage.getItem('urls'));
        console.log(urls)

        const urlId = parseInt(li.id);

        urls = urls.filter(url => url.id !== urlId);
        localStorage.setItem('urls', JSON.stringify(urls));
        const editBtns = document.querySelectorAll('.edit-btn');

        // Loop through each button and toggle classes
        editBtns.forEach(editBtn => {
            editBtn.classList.toggle('active-remove-btn');
        });
        showAllUrls(urls);

    } else if (e.target.classList.contains('copy-btn')) {
        let copiedBtn = e.target.closest('button.copy-btn');
        
        copiedBtn.classList.add('copy-btn-copied')
        copiedBtn.textContent = "Copied!"
        let urlTextElement = li.querySelector('span.url-name');
  
        let copyId = parseInt(li.id);  
        let s = 0;
        let end = urlsData.length - 1;
        let textContentCopy = "";

        // binary search
         while (s <= end) {
            let mid = Math.floor((s + end) / 2);  
            if (urlsData[mid].id === copyId) {
                textContentCopy = urlsData[mid].url;  
                break;
            } else if (urlsData[mid].id < copyId) {
                s = mid + 1;  
            } else {
                end = mid - 1;  
            }
        }

        navigator.clipboard.writeText(textContentCopy);
        setTimeout(() => {
            copiedBtn.classList = "copy-btn"
            copiedBtn.textContent = "Copy"

        }, 900)
    }
});


// *******************************Handle user login************************
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

        newLoginButton.style.backgroundImage = "linear-gradient(90deg, #020024 0%, rgb(33, 57, 101) 60%, var(--main-color) 100%)";
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




(() => {
    showAllUrls(urlsData);
    loginFunc();
})()

export default { showAllUrls, loginFunc };
