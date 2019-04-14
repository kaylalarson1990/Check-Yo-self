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

// function saveCardToStorage() {
//   createToDo();
//   var list = createTasks[createTasks.length - 1];
//   addTaskCard(list);
//   removeFromList();
// }

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
  const newCard = `<article class="task__list-card" data-id="${newTasks.id}">
        <h2 class="border__card-title">${newTasks.title}</h2>
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
  newTasks.tasks.forEach(function(list) {
    document.querySelector(".task__list").insertAdjacentHTML("beforeend",
      `<div class="task__list">
          <img src="images/checkbox.svg" class="check-item">
          <p class="task__list-item">${list.content}</p></div>`);
  });
      removeFromList();
}

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