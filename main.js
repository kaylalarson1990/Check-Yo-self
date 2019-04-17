// query selectors //
var searchBtn = document.querySelector(".btn__search");
var searchInput = document.querySelector(".input__search");
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

// global variable array //
var createTasks = JSON.parse(localStorage.getItem("saveTasks")) || [];

// event listeners //
window.addEventListener("load", onStart);
addItems.addEventListener("submit", addToList);
addTaskBtn.addEventListener("click", addToList);
addItems.addEventListener("input", checkInput);
taskTitleInput.addEventListener("input", checkInput);
taskItemInput.addEventListener("input", checkInput);
makeTaskListBtn.addEventListener("click", checkInput);
makeTaskListBtn.addEventListener("click", createNewToDo);
clearAllBtn.addEventListener("click", clearAll);
mainContainer.addEventListener("click", bottomActiveButtons);
newTaskDisplay.addEventListener("click", clearList);
searchInput.addEventListener("keyup", function() { 
  searchTask(searchInput.value);
});
filterUrgencyBtn.addEventListener("click", filterUrgencyTasks);


// function when first loading page //
function onStart() {
  checkInput();
  onLoadTodos();
}

function checkInput() {
  if(taskTitleInput.value === "" || taskItemInput.value === "") {
    disableButton(addTaskBtn);
    disableButton(makeTaskListBtn);
  } else {
    enableButton(addTaskBtn);
    enableButton(makeTaskListBtn);
    enableButton(clearAllBtn);
  }
}

function onLoadTodos() {
  createTasks.forEach(function(todoCard) {
    addTaskCard(todoCard);
    newInstance(createTasks);
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
  var iterateTaskArray = taskArray.map(list => list = {id: list.dataset.id, content: list.innerText, checked: false});
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
    <li class="new-task-item" data-id=${Date.now()}>${taskItemInput.value}</li></div>`
  localStorage.setItem("saveTasks", JSON.stringify(taskList));
  removeFromList();
}

// create card function //
function addTaskCard(newTasks) {
  taskPlaceholder.classList.add("hidden");
  if(newTasks.urgent === false) {
  var newCard = `<article class="task__list-card" data-id="${newTasks.id}">
        <h2 class="border__card-title">${newTasks.title}</h2>
        <div class="task__list-middle flex">
        </div>
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
        <h2 class="border-active border__card-title">${newTasks.title}</h2>
        <div class="task__list-checked task__list-middle flex">
        </div>
        <div class="border-active btns__task-card">
          <a class= "urgent-active">
            <img src="images/urgent-active.svg" class="btn__urgent-task" alt="Urgent Button"><span class="urgent-text">URGENT</span>
          </a>
          <a class="delete">
            <img src="images/delete.svg" class="btn__delete-card" alt="Delete Card Button"><span class="delete-text">DELETE</span>
          </a>
        </div>
      </article>`; 
      mainContainer.insertAdjacentHTML("afterbegin", activeCard);
    }
  newTasks.tasks.forEach(function(list) {
    list.checked === false ? document.querySelector(".task__list-middle").insertAdjacentHTML("beforeend",`<div class="task__list-middle-task flex" data-id=${list.id}>
      <img src="images/checkbox.svg" class="check-item">
      <p class="task__list-item">${list.content}</p></div>`) : document.querySelector(".task__list-middle").insertAdjacentHTML("beforeend",`<div class="task__list-middle-task flex task-checked" data-id=${list.id}>
      <img src="images/checkbox-active.svg" class="check-item">
      <p class="task__list-item">${list.content}</p></div>`);
    });
      clearFields();
      checkInput();
}

function checkTask(click, index) {
  var todoList = createTasks[index];
  var findId = click.parentNode.dataset.id;
  var targetIndex = todoList.tasks.findIndex(list => list.id === findId);
  var taskList = todoList.tasks[targetIndex];
  markChecked(click, taskList);
  todoList.updateTask(click, targetIndex);
}

function markChecked(click, taskList) {
  if (taskList.checked === false) {
    click.setAttribute("src", "images/checkbox-active.svg");
    click.parentNode.classList.add("task-checked");
    click.classList.add("btn__checkbox-filled")
  } else { 
    click.setAttribute("src", "images/checkbox.svg");
    click.parentNode.parentNode.classList.remove("task__list-checked");
    click.classList.remove("btn__checkbox-filled");
  }
}

function urgentButton(click, index) {
  var todoList = createTasks[index];
  if(todoList.urgent === false) {
    click.setAttribute("src", "images/urgent-active.svg");
    click.parentNode.parentNode.parentNode.classList.add("task__active", "border-active");
  } else {
    (todoList.urgent === true)
    click.setAttribute("src", "images/urgent.svg");
    click.parentNode.parentNode.parentNode.classList.remove("task__active", "border-active");
  }
  todoList.updateToDo(click);
}

function deleteButton(click, index) {
  var todoList = createTasks[index];
  var tasksDone = todoList.tasks.filter(list => list.checked === true);
  if(todoList.tasks.length === tasksDone.length) {
    click.parentNode.parentNode.parentNode.parentNode.removeChild(click.parentNode.parentNode.parentNode);
    todoList.deleteFromStorage(index);
  }
}

function bottomActiveButtons(e) {
  var click = e.target;
  var newId = click.parentNode.parentNode.parentNode.dataset.id;
  var newIndex = getNewIndex(newId);
  if(click.matches(".btn__delete-card")) {
    deleteButton(click, index);
  }
  if(click.matches(".btn__urgent-task")) {
    urgentButton(click, index);
  }
  if(click.matches(".check-item")) {
    checkTask(click, index);
  }
}

function getNewIndex(newId) {
  index = createTasks.findIndex(list => list.id == newId);
  return index;
}

function searchTask(query) {
  query = query.toLowerCase();
  var title, content;
  var taskList = document.getElementsByClassName("task__list-card");
  for(var i = 0; i < taskList.length; i++) {
    title = taskList[i].querySelector(".border__card-title").innerText;
    content = taskList[i].querySelector(".task__list-item").innerText;
    content.toLowerCase().indexOf(query) > -1 || title.toLowerCase().indexOf(query) > -1 ?
      taskList[i].style.display = "" : taskList[i].style.display = "none";
  }
}

function filterUrgencyTasks() {
  var filterSearchResults = createTasks.filter(taskCard => taskCard.urgent === true);
  mainContainer.innerHTML = "";
  filterUrgencyBtn.classList.contains("urgent-active") ?
    filterUrgencyBtn.classList.remove("urgent-active") :
    filterUrgencyBtn.classList.add("urgent-active");
    filterSearchResults.forEach(taskCard => addTaskCard(taskCard));
}

// buttons and clearing inputs //
function clearAll() {
  taskTitleInput.value = "";
  newTaskDisplay.innerHTML = "";
}

function removeFromList() {
  taskItemInput.value = "";
}

function clearFields() {
  taskTitleInput.value = "";
  newTaskDisplay.innerHTML = "";
  taskItemInput.value = "";
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