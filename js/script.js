import urls from './data.js';
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.right-menu');
let ulOuter = document.querySelector(".urls");
let closeDialog = document.querySelector('.close-dialog')
let btnSave = document.querySelector('.openUrlSaveDialog')
let btnSubmit = document.querySelector('#menu-icon')

btnSubmit.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}


btnSave.onclick = function () {
    const modal = document.querySelector('.dialgue');
    modal.classList.remove('activeDialogClose');
    modal.classList.toggle('activeDialog');

}

closeDialog.onclick = function () {
    const modal = document.querySelector('.dialgue');
    modal.classList.remove('activeDialog');
    modal.classList.add('activeDialogClose');

}



function showAllUrls() {



    let allTag = urls.map((url) => {
        return `<ul class="ul-outer">
                    <li>${url.url} <button>Copy</button></li>
                </ul>`
    })
    allTag = allTag.join("");
    ulOuter.innerHTML = allTag;
}

showAllUrls()

export default showAllUrls;
