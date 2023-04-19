// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery')
const submitBtn = document.querySelector('.submit-btn')
const container = document.querySelector('.grocery-container') // grocery container
const list = document.querySelector('.grocery-list')
const clearBtn = document.querySelector('.clear-btn')

// edit option
let editElement;
let editFlag = false; // false by default until we click the edit button
let editID = "";
// ****** EVENT LISTENERS **********
// submit form
form.addEventListener('submit', addItem)
// clear items
clearBtn.addEventListener('click', clearItems)

// ****** FUNCTIONS **********
function addItem(e) {
    e.preventDefault(); // prevents default behavior
    const value = grocery.value; // inputs the grocery item and adds to the list

    const id = new Date().getTime().toString(); // using this is a cheat instead of pulling from a library?
    if (value && !editFlag){ // this says if value is true and if editFlag is false
        const element = document.createElement('article'); //console.log('add item to the list')
        // add class
        element.classList.add('grocery-item');
        // add id
        const attr = document.createAttribute('data-id');
        attr.value = id;
        element.setAttributeNode(attr);
        element.innerHTML = `
            <p class="title">${value}</p>
            <div class="btn-container">
            <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
            </button>
            <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
            </div>`; 

        // variables for delete and edit buttons
        const deleteBtn = element.querySelector('.delete-btn');
        const editBtn = element.querySelector('.edit-btn');
        // Add event listeners
        deleteBtn.addEventListener('click', deleteItem); // the function is the 2nd paramater for both
        editBtn.addEventListener('click', editItem);
        
        // append child
        list.appendChild(element);
        // display alert
        displayAlert('itme added to the list', 'success');
        // show container
        container.classList.add("show-container");
           
        //***** local and default are placeholders ******
        // add to local storage
        addToLocalStorage(id, value);

        // set back to default
        setBackToDefault();
    }else if(value && editFlag) { // only once you click to edit. Also this says if value is true and if editFlag is true
        console.log('editing')
    }
    else{
        displayAlert("please enter value", "danger"); // danger is the ID thats being pulled
    }
    
}

// display alert
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`); // this is pulled from the ID's in css to display a pop-up if somoene submits an empty value

    // remove alert
    setTimeout(function(){ // setTimeout looks for a callback function (the function that will run) and then how long it will be invoked (in 1 second).
        alert.textContent = '';  // set to an empty string.
    alert.classList.remove(`alert-${action}`); // remove has been added.
    }, 2000)
}

// clear items
function clearItems(){
    const items = document.querySelectorAll('.grocery-item');

    if (items.length > 0){ // this will be at least one of the items
        items.forEach(function(item){
            list.removeChild(item)
        });
    }
    container.classList.remove("show-container"); // clears out the clear items option.
    displayAlert("empty list", "danger"); // re-used the displayAlert to send a pop-up saying Empty list after the container above is removed.
    setBackToDefault(); // this sets everything back  to default when choosing to delete after editing is in progress for example.
    // localStorage.removeItem('list'); // this removes list from local storage.

}

// delete function
function deleteItem(){
    console.log('item deleted');
}
// edit function
function editItem(){
    console.log('edit item');
}


// set back to defult
function setBackToDefault(){
    console.log('set back to default');
}
// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {
    grocery.value = ""; // this clears the value after each submission
    editFlag = false;
    editID = '';
    submitBtn.textContent = "submit";
}

// ****** SETUP ITEMS **********
