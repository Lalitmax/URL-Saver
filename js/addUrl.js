import urls from './data.js';
import showAllUrls from './script.js'
let keywordsTags = document.querySelector(".keywords-tags");
let addKeywordInput = document.querySelector('.addKey-word-input');
let addTags = document.querySelector('.addTags');
let urlInput = document.querySelector('.url-input');
let btnSave = document.querySelector('.btn-submit');

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
        urls.push({ url: urlInput.value, keywords: tags });
        urlInput.value = "";
        showAllUrls.showAllUrls();
        tags = [];
        showTags();
        console.log(urls)
    }


})
