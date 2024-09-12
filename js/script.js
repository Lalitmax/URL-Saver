let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.right-menu');
menuIcon.onclick = () =>  {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}
