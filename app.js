const table = document.querySelector("table");
const addBookBtn = document.querySelector("#add");
const save = document.querySelector("#save");
const inputForm = document.querySelector(".form-wrapper");

addBookBtn.addEventListener("click", ()=>{
    inputForm.classList.remove("hidden");
    addBookBtn.classList.add("hidden");
})
addBookBtn.addEventListener("transitionend", ()=>{
    if (addBookBtn.classList.contains("hidden")){
        addBookBtn.classList.remove("display-block");
        addBookBtn.classList.add("display-none");
        inputForm.classList.remove("display-none");
        inputForm.classList.add("display-block");
    } else{
        addBookBtn.classList.remove("display-none");
        addBookBtn.classList.add("display-block");
        inputForm.classList.remove("display-block");
        inputForm.classList.add("display-none");
    }
})
save.addEventListener("click", ()=>{
    addBookBtn.classList.remove("hidden");
    inputForm.classList.add("hidden");
})


// console.log(table);
let myLibrary = [];

function Book(name, author, pages, isCompleted) {
    this.name= name,
    this.author= author,
    this.pages= pages,
    this.completed= isCompleted
}

function BookMethods(){

}
BookMethods.prototype.generate = function(n){
    let tableRow = document.createElement("tr");
    let deleteCell = document.createElement("td");
    let deleteBtn = document.createElement("button");
    let deleteIcon = document.createElement("i");
    for (prop in this){
        if (this.hasOwnProperty(prop)){
            console.log(prop);
            let cell = document.createElement("td");
            if (prop === "completed"){
                let checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.addEventListener("click", ()=>{
                    toggleCompleted(checkbox.parentElement.parentElement.dataset.n)
                })
                if (this[prop] === true){
                    console.log("I AM HERE");
                    checkbox.checked = true;
                    // console.log(checkbox.checked);
                } else{
                    checkbox.checked = false;
                    // console.log(checkbox.checked);
                }
                cell.appendChild(checkbox);
            } else {
                cell.textContent = this[prop];
            }
            // console.log(myLibrary[n+1][prop]);
            tableRow.appendChild(cell);
        }
    }
    deleteIcon.classList.add("fa");
    deleteIcon.classList.add("fa-trash-alt");
    deleteBtn.classList.add("delete-book");
    deleteBtn.setAttribute("data-n", `${n}`);
    deleteAddEventListener(deleteBtn);
    deleteBtn.appendChild(deleteIcon);
    console.log(deleteBtn);
    deleteCell.appendChild(deleteBtn);
    tableRow.appendChild(deleteCell);
    tableRow.setAttribute("data-n", `${n}`);
    return tableRow;
}

Book.prototype = Object.create(BookMethods.prototype);
// // let libraryStorage = JSON.parse(window.localStorage.getItem('libraryStorage'));
// console.log("library: ", libraryStorage);
// console.log("library: ", window.localStorage.getItem('libraryStorage'));
// if (libraryStorage === null){
//     myLibrary = [];
// }else{
//     myLibrary = JSON.parse(window.localStorage.getItem('libraryStorage'));
// }

// localStorage.setItem("libraryStorage", JSON.stringify(myLibrary));


// window.onload = function(){
//     addBookToLibrary("The Shining", "Stephen King", "659", true);
//     addBookToLibrary("The Martian", "Andy Weir", "384", true);
//     addBookToLibrary("Atomic Habits", "James Clear", "319", false);
//     localStorage.setItem("libraryStorage", JSON.stringify(myLibrary));
//     libraryStorage = JSON.parse(window.localStorage.getItem('libraryStorage'));
//     console.log(libraryStorage);
// }

// localStorage.setItem("libraryStorage", JSON.stringify(myLibrary));
libraryStorage = JSON.parse(window.localStorage.getItem('libraryStorage'));
if(libraryStorage === null){
    console.log("ERROR");
} else{
    // myLibrary = libraryStorage
    console.log("Line 114: ", libraryStorage);
    // console.log(libraryStorage[0].author);
    let n = libraryStorage.length;
    for (i=0;i<n;i++){
        let title = libraryStorage[i].name;
        let author = libraryStorage[i].author;
        let pages = libraryStorage[i].pages;
        let completed = libraryStorage[i].completed;
        addBookToLibrary(title, author, pages, completed);
    }
}
// window.localStorage.clear();
// console.log(libraryStorage);
// console.log(myLibrary);
// let n = myLibrary.length;
// console.log(n);
// let tableRow;
// Book.prototype = Object.create(BookMethods.prototype);

// window.onload = function(){
//     for (i=0; i<n; i++){
//         console.log(myLibrary[i]);
//         // myLibrary[i].prototype = Object.create(BookMethods.prototype);
//         console.log(myLibrary[i].prototype);
//         // let tableRow = myLibrary[i].generate(i);
//         // table.appendChild(tableRow);
//     }
// }


save.addEventListener("click", () => {
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let completed = document.querySelector("#completed").checked;
    console.log("Completed Status: ", completed);
    addBookToLibrary(title, author, pages, completed);
    // console.log(title, author, pages, completed);
})



function addBookToLibrary(bookName, bookAuthor, bookPages, isCompleted){
    console.log("add book to library")
    let n = myLibrary.length;
    // console.log(bookName, bookAuthor, bookPages, isCompleted); 
    // Book.prototype = Object.create(BookMethods.prototype);
    myLibrary[n]  = new Book(bookName, bookAuthor, bookPages, isCompleted);
    localStorage.setItem("libraryStorage", JSON.stringify(myLibrary));
    console.log(myLibrary[n]);
    let tableRow =  myLibrary[n].generate(n);
    console.log("table row: ", tableRow);
    table.appendChild(tableRow);
}

function deleteBook(arrayN){
    let rows = document.querySelectorAll("tr");
    let deleteRow;
    let len = rows.length;
    console.log("LENGTH: ", len);
    console.log("Array N:  ", arrayN);
    // console.log(rows.dataset.n);
    for(i=0; i<len; i++){
        // console.log(rows[i].dataset.n);
        if (rows[i].dataset.n === arrayN){
            deleteRow = rows[i];
        }
    }
    console.log("ROW TO BE DELETED: ",deleteRow);
    deleteRow.remove();
    myLibrary.splice(arrayN, 1);
    console.log("LIBRARY AFTER DELETE: ", myLibrary);
    localStorage.setItem("libraryStorage", JSON.stringify(myLibrary));
}

function deleteAddEventListener(deleteBtn){
    deleteBtn.addEventListener("click", () => {
        // console.log(deleteBtn);
        // console.log("delete data: ", deleteBtn.dataset.n);
        let n = deleteBtn.dataset.n;
        console.log(n);
        deleteBook(n);
    })
}

function toggleCompleted(n){
    console.log(myLibrary[n].completed);
    if (myLibrary[n].completed){
        myLibrary[n].completed = false;
    } else {
        myLibrary[n].completed = true;
    }
}