// query selectors //
var searchBtn = document.querySelector(".btn__search");
var searchInput = document.querySelector(".input__search");
var sideBar = document.querySelector(".side-bar");
var taskTitleInput = document.querySelector(".input__title");
var newTaskDisplay = document.querySelector(".side-bar__task-display");
var asideNav = document.querySelector(".side-bar");
var deleteTaskItem = document.querySelector(".delete-item")
var addItems = document.querySelector(".add-task-field");
var taskItemInput = document.querySelector(".input__task");
var addTaskBtn = document.querySelector(".btn__add-task");
var makeTaskListBtn = document.querySelector(".btn__make-task");
var clearAllBtn = document.querySelector(".btn__clear");
var filterUrgencyBtn = document.querySelector(".btn__urgency-filter");
var mainContainer = document.querySelector(".main-container");
var taskCard = document.querySelector(".task__list-card");
var taskTitle = document.querySelector(".border__card-title");
var taskList = document.querySelector(".task__list-item");
var urgentTaskBtn = document.querySelector(".btn__urgent-task");
var deleteCardBtn = document.querySelector(".btn__delete-card");
var taskPlaceholder = document.querySelector(".task-placeholder");
var createTasks = JSON.parse(localStorage.getItem("saveTasks")) || [];



// event listeners //
window.addEventListener("load", onStart);

addItems.addEventListener("submit", addToList);

taskTitleInput.addEventListener("input", checkInput)

taskItemInput.addEventListener("input", checkInput);

makeTaskListBtn.addEventListener("click", createNewToDo);

clearAllBtn.addEventListener("click", clearAll);

mainContainer.addEventListener("click", bottomButtons);

newTaskDisplay.addEventListener("click", clearList);

// function when first loading page //
function onStart() {
  disableButton(addTaskBtn);
  disableButton(makeTaskListBtn);
  disableButton(clearAllBtn);
  newInstance(createTasks);
  onLoadTodos();
}

function checkInput() {
  if(taskTitleInput.value === "" || taskItemInput.value === "") {
    disableButton(addTaskBtn);
    disableButton(makeTaskListBtn);
    disableButton(clearAllBtn);
  } else {
    enableButton(addTaskBtn);
    enableButton(makeTaskListBtn);
    enableButton(clearAllBtn);
  }
}

function onLoadTodos() {
  createTasks.forEach(function(todoCard) {
    addTaskCard(todoCard);
  });
}


// function reinstantiating new todo list //
function newInstance(todoList) {
  createTasks = [];
  todoList.forEach(function(todo) {
    var newList = new ToDoList(todo.id, todo.title, todo.urgent, todo.tasks);
    createTasks.push(newList);
  });
}


// main functions //
function createNewToDo(e) {
  e.preventDefault();
  var taskArray = Array.prototype.slice.call(document.querySelectorAll(".new-task-item"));
  var iterateTaskArray = taskArray.map(function(list) {
    return list = {content: list.innerText, checked: false}
  });
  var newList = new ToDoList(Date.now(), taskTitleInput.value, false, iterateTaskArray);
  addTaskCard(newList);
  createTasks.push(newList);
  newList.saveToStorage(createTasks);
  clearAll();
}

function addToList(e) {
  e.preventDefault();
  newTaskDisplay.innerHTML += `<div>
    <img src="images/delete.svg" class="delete-item">
    <li class="new-task-item">${taskItemInput.value}</li></div>`
  localStorage.setItem("saveTasks", JSON.stringify(taskList));
  this.reset();
}

function addTaskCard(newTasks) {
  taskPlaceholder.classList.add("hidden");
  if(newTasks.urgent === false) {
  var newCard = `<article class="task__list-card" data-id="${newTasks.id}">
        <h2 class="border__card-title" contenteditable=true>${newTasks.title}</h2>
        <section class="task__list">
        </section>
        <div class="btns__task-card">
          <a class= "urgent">
            <img src="images/urgent.svg" class="btn__urgent-task" alt="Urgent Button"><span class="urgent-text">URGENT</span>
          </a>
          <a class="delete">
            <img src="images/delete.svg" class="btn__delete-card" alt="Delete Card Button"><span class="delete-text">DELETE</span>
          </a>
        </div>
      </article>`; 
      mainContainer.insertAdjacentHTML("afterbegin", newCard);
    }
    if(newTasks.urgent === true) {
      var activeCard = `<article class="task__active task__list-card" data-id="${newTasks.id}">
        <h2 class="border__card-title" contenteditable=true>${newTasks.title}</h2>
        <section class="task__list">
        </section>
        <div class="btns__task-card">
          <a class= "urgent">
            <img src="images/urgent.svg" class="btn__urgent-task" alt="Urgent Button"><span class="urgent-text">URGENT</span>
          </a>
          <a class="delete">
            <img src="images/delete.svg" class="btn__delete-card" alt="Delete Card Button"><span class="delete-text">DELETE</span>
          </a>
        </div>
      </article>`; 
      mainContainer.insertAdjacentHTML("afterbegin", activeCard);
    }
  newTasks.tasks.forEach(function(list) {
    if(list.checked === false) {
    document.querySelector(".task__list").insertAdjacentHTML("beforeend",
      `<div class="task__list task__list-checked" data-id=${list.id}>
          <img src="images/checkbox.svg" class="check-item">
          <p class="task__list-item" contenteditable=true>${list.content}</p></div>`);
    } else {
    document.querySelector(".task__list").insertAdjacentHTML("beforeend",
      `<div class="task__list task__list-checked" data-id=${list.id}>
          <img src="images/checkbox-active.svg" class="check-item">
          <p class="task__list-item" contenteditable=true>${list.content}</p></div>`);
    }
  });
      removeFromList();
}

function checkTask(click, index) {
  var todoList = createTasks[index];
  var findId = click.parentNode.parentNode.dataset.id;
  var findIndex = todoList.tasks.findIndex(function(list) {
  return list.id === findId;
  });
  var taskList = todoList.tasks[findIndex];
  if(taskList.checked === false) {
    click.setAttribute("src", "images/checkbox-active.svg");
    click.parentNode.classList.add("task__list-checked");
    click.classList.add("btn__checkbox-filled")
  }
  if(taskList.checked === true) {
    click.setAttribute("src", "images/checkbox.svg");
    click.parentNode.classList.remove("task__list-checked");
    click.classList.remove("btn__checkbox-filled");
  }
  todoList.updateTask(click, index);
}

function urgentButton(click, index) {
  var todoList = createTasks[index];
  if(taskList.urgent === false) {
    click.setAttribute("src", "images/urgent-active.svg");
    click.parentNode.parentNode.parentNode.classList.add("task__active");
  }
  if(taskList.urgent === true) {
    click.setAttribute("src", "images/urgent.svg");
    click.parentNode.parentNode.parentNode.classList.remove("task__active");
  }
  todoList.updateToDo(click);
}

function bottomButtons(e) {
  var click = e.target;
  var newId = click.parentNode.parentNode.parentNode.dataset.id;
  var newIndex = getNewIndex(newId);
  if(click.matches(".btn__delete-card")) {
    deleteButton(click, index);
  }
  if(click.matches(".btn__urgent-task")) {
    urgentButton(click);
  }
  if(click.matches(".check-item")) {
    checkTask(click, index);
  }
}

function getNewIndex(newId) {
  index = createTasks.findIndex(function(list) {
    return list.id == newId;
  });
  return index;
}

function deleteButton(click, index) {
  var todoList = createTasks[index];
  console.log(todoList)
  click.parentNode.parentNode.parentNode.parentNode.removeChild(click.parentNode.parentNode.parentNode);
  todoList.deleteFromStorage(index);
}

function deleteCard(e) {
  if(e.target.matches(".delete-item")) {
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
  }
}


// buttons and clearing inputs //

function clearAll() {
  taskTitleInput.value = "";
  newTaskDisplay.innerHTML = "";
}

function removeFromList() {
  taskTitleInput.value = "";
  newTaskDisplay.innerHTML = "";
}

function clearList(e) {
  e.target.closest("div").remove();
}

function disableButton(button) {
  button.setAttribute("disabled", "");
}

function enableButton(button) {
  button.removeAttribute("disabled");
}