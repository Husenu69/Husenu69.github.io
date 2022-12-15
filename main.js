
const input = document.querySelector('input');
const btn = document.querySelector('.addTask > button');
const notCompleted = document.querySelector('.notCompleted');
const Completed = document.querySelector('.Completed');
const localStorageUncompletedName = "Tasks";
const localStorageCompletedName = "CompletedTasks";

btn.addEventListener('click', addNewElementToList);
input.addEventListener('keyup', (e)=>{
    (e.keyCode === 13 ? addNewElementToList(e) : null);
})



function retrieveItems() {
    var notCompletedItems = JSON.parse(localStorage.getItem(localStorageUncompletedName));
    var CompletedItems = JSON.parse(localStorage.getItem(localStorageCompletedName));

    for (const value of notCompletedItems) {
        var element = createElement(value);
        notCompleted.appendChild(element);
    }

    for (const value of CompletedItems) {
        var element = createElement(value);
        Completed.appendChild(element);
    }
}

function addToLocalStorage(newItemName) {
    var taskList = JSON.parse(localStorage.getItem(localStorageUncompletedName));
    
    taskList = taskList ? taskList : [];

    taskList.push(newItemName);

    localStorage.setItem(localStorageUncompletedName, JSON.stringify(taskList));
}


function moveToCompleted(itemName) {
    var taskList = JSON.parse(localStorage.getItem(localStorageUncompletedName));
    var completedTaskList = JSON.parse(localStorage.getItem(localStorageCompletedName));

    completedTaskList = completedTaskList ? completedTaskList  : [];
    taskList = taskList ? taskList : [];

    var index = taskList.indexOf(itemName);
    if (index > -1) {
        taskList.splice(index, 1);
    }

    completedTaskList.push(itemName);
    
    localStorage.setItem(localStorageUncompletedName, JSON.stringify(taskList));
    localStorage.setItem(localStorageCompletedName, JSON.stringify(completedTaskList));
}

function deleteFromLocalStorage(itemName) {
    var taskList = JSON.parse(localStorage.getItem(localStorageUncompletedName));
    var completedTaskList = JSON.parse(localStorage.getItem(localStorageCompletedName));

    completedTaskList = completedTaskList ? completedTaskList  : [];
    taskList = taskList ? taskList : [];

    var index = taskList.indexOf(itemName);
    if (index > -1) {
        taskList.splice(index, 1);
    }

    var completedIndex = completedTaskList.indexOf(itemName);
    if (completedIndex > -1) {
        completedTaskList.splice(index, 1);
    }
    
    localStorage.setItem(localStorageUncompletedName, JSON.stringify(taskList));
    localStorage.setItem(localStorageCompletedName, JSON.stringify(completedTaskList));
}

function checkItem(e) {
    const parent = this.parentNode;

    moveToCompleted(parent.textContent);

    parent.remove();
    Completed.appendChild(parent);
    
    //checkBtn.style.display = 'none'; FIX THIS
}

function deleteItem(e) {
    const parent = this.parentNode;

    deleteFromLocalStorage(parent.textContent);

    parent.remove();
}

function addNewElementToList(e){
    var value = input.value
    input.value = '';

    var newItem = createElement(value);
    notCompleted.appendChild(newItem);

    addToLocalStorage(value);
}


function createElement(value) {
    const newLi = document.createElement('li');
    const checkBtn = document.createElement('button');
    const delBtn = document.createElement('button');

    checkBtn.innerHTML = '<i class="fa fa-check"></i>';
    delBtn.innerHTML = '<i class="fa fa-trash"></i>';

    newLi.textContent = value;
    newLi.appendChild(checkBtn);
    newLi.appendChild(delBtn);

    checkBtn.addEventListener('click', checkItem);
    delBtn.addEventListener('click', deleteItem);

    return newLi;
}

retrieveItems();