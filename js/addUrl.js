// import urls from './data.js';
import showAllUrls from './script.js'
let keywordsTags = document.querySelector(".keywords-tags");
let addKeywordInput = document.querySelector('.addKey-word-input');
let addTags = document.querySelector('.addTags');
let urlInput = document.querySelector('.url-input');
let btnSave = document.querySelector('.btn-submit');
let removeUrl = document.querySelector('.remove-url');

// Use addEventListener to handle the input event
let inputValue = "";
let tags = [];
addKeywordInput.addEventListener('input', () => {
    inputValue = addKeywordInput.value;
});



function showTags() {

    let allTags = tags.map(e => {
        return `<span class="tags">${e}</span>`
    })
    allTags = allTags.join("");
    keywordsTags.innerHTML = allTags;
    addKeywordInput.value = "";

}

addTags.addEventListener('click', () => {
    if (inputValue.length > 0)
        tags.push(inputValue);
    inputValue = "";
    showTags();

})

addKeywordInput.addEventListener('keypress', (event) => {

    if (event.key === "Enter") {
        event.preventDefault();
        if (inputValue.length > 0)
            tags.push(inputValue);
        inputValue = "";
        showTags();
    }

})


btnSave.addEventListener('click', () => {
    if (urlInput.value.length > 0) {

        let urls = localStorage.getItem('urls');
        if (urls) {
            urls = JSON.parse(urls);
            const newId = urls.length > 0 ? urls[urls.length - 1].id + 1 : 1; // Increment last ID or start from 1
            urls.push({ id: newId, url: urlInput.value, keywords: tags });

            urlInput.value = "";
            tags = [];
            showTags();
            localStorage.setItem('urls',JSON.stringify(urls));
            showAllUrls.showAllUrls();

        }else {
            urls = [];

            const newId = urls.length > 0 ? urls[urls.length - 1].id + 1 : 1; // Increment last ID or start from 1
            urls.push({ id: newId, url: urlInput.value, keywords: tags });

            urlInput.value = "";
            tags = [];
            showTags();
            localStorage.setItem('urls',JSON.stringify(urls));
            showAllUrls.showAllUrls();

        }

    }
    removeUrl.style.color = "white";


})
