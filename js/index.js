const form = document.forms[0];
const bookTable = document.querySelector('#bookTable');


// creating array items from local storage or creating empty array 
let bookStore = JSON.parse(localStorage.getItem('bookStore')) || [];

// creating table from local storage if item present
if (bookStore.length != 0) {
    for (let key in bookStore) {
        addRows(
            bookStore[key].name,
            bookStore[key].author,
            bookStore[key].priority,
            bookStore[key].genre
        )
    }
}

// immediately checking input value if user click submit with out put data inside
form.bookName.addEventListener("change", function () {
    validateBookName(form.bookName, "#bookNameError");
});

form.author.addEventListener("change", function () {
    validateAuthor(form.author, "#authorError");
});

// checking data and if no error  created table and save to local storage  

form.addEventListener("submit", function (e) {
    validateBookName(form.bookName, "#bookNameError");
    validateAuthor(form.author, "#authorError");

    let invalidElements = document.querySelectorAll(".invalid");
    if (!invalidElements.length > 0) {
        addRows(
            form.bookName.value,
            form.author.value,
            form.priority.value,
            form.genre.value
        );
        setItemtoStorage(
            form.bookName.value,
            form.author.value,
            form.priority.value,
            form.genre.value
        );

    }
    form.reset()
    e.preventDefault()
});


// checking input book name 
function validateBookName(element, errorElementSelector) {
    let errorElement = document.querySelector(errorElementSelector);

    element.classList.remove("valid");
    element.classList.remove("invalid");
    errorElement.style.display = "none";

    if (element.value.length > 0) {
        element.classList.add("valid")
    } else {
        element.classList.add("invalid");
        errorElement.style.display = "inline"
    }

}

// checking input Author name
function validateAuthor(element, errorElementSelector) {
    let errorElement = document.querySelector(errorElementSelector);

    element.classList.remove("valid");
    element.classList.remove("invalid");
    errorElement.style.display = "none";

    if (element.value.length > 2) {
        element.classList.add("valid")
    } else {
        element.classList.add("invalid");
        errorElement.style.display = "inline"
    }

}

// creating table in display on page 
function addRows(name, author, priority, genre) {
    let tr = document.createElement('tr');
    tr.insertAdjacentHTML('beforeend', `<td>${name}</td>`);
    tr.insertAdjacentHTML('beforeend', `<td>${author}</td>`);
    tr.insertAdjacentHTML('beforeend', `<td>${priority}</td>`);
    tr.insertAdjacentHTML('beforeend', `<td>${genre}</td>`);
    bookTable.append(tr);
    if (bookTable.hidden) bookTable.hidden = false
}

// save table to local storage 
function setItemtoStorage(name, author, priority, genre) {

    let book = {
        name: name,
        author: author,
        priority: priority,
        genre: genre
    }
    bookStore.push(book)
    localStorage.setItem('bookStore', JSON.stringify(bookStore))
}




