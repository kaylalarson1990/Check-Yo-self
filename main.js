// query selectors //
var searchBtn = document.querySelector(".btn__search");
var searchInput = document.querySelector(".input__search");
var taskTitleInput = document.querySelector(".input__title");
var newTaskDisplay = document.querySelector(".side-bar__task-display");
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
var tasks = [];
var createTasks = JSON.parse(localStorage.getItem("tasks")) || [];

// starting //

if(createTasks.length != 0) {
  onLoad();
  pageRefresh(createTasks);
}

// event listeners //

addItems.addEventListener("submit", addToList);

makeTaskListBtn.addEventListener("click", manyFunctions);

clearAllBtn.addEventListener("click", clearAll);

// deleteCardBtn.addEventListener("click", deleteCard);

// functions //

// function saveNewTask(id, title, tasks, urgent) {
//   var newTask = new ToDoList(Date.now(), taskTitleInput.value, taskItemInput.value);
//   createTasks.push(newTask);
//   newTask.saveToStorage(createTasks);
//   addTaskCard(newTask);
// }

// function createTaskItem() {
  
// }

function addToList(e) {
  e.preventDefault();
  newTaskDisplay.innerHTML += `<p><img src="images/delete.svg" class="delete-item">${taskItemInput.value}
  </p>`
  addItemsToArray(taskItemInput.value);
  this.reset();
}

function addItemsToArray() {
  var newObject = new Items(taskItemInput.value);
  tasks.push(newObject);
}

function createToDo() {
  var makeNewCard = new ToDoList(taskTitleInput.value, tasks);
  createTasks.push(makeNewCard);
  tasks = [];
}

function manyFunctions() {
  addTaskCard(tasks);
  createToDo(taskTitleInput.value, tasks);
  console.log(createTasks)
}

function addTaskCard(tasks) {
  taskPlaceholder.classList.add("hidden");
  mainContainer.innerHTML = `<article class="task__list-card" data-id="${tasks.id}">
        <h2 class="border__card-title">${taskTitleInput.value}</h2>
        <ul class="task__list">
          <p class="task__list-item"><img src="images/checkbox.svg" class="check-item">${createTasks}</p>
        </ul>
        <div class="btns__task-card">
          <a class= "urgent">
            <img src="images/urgent.svg" class="btn__urgent-task" alt="Urgent Button"><span class="urgent-text">URGENT</span>
          </a>
          <a class="delete">
            <img src="images/delete.svg" class="btn__delete-card" alt="Delete Card Button"><span class="delete-text">DELETE</span>
          </a>
        </div>
      </article>` 
      + mainContainer.innerHTML;
}

function clearAll() {
  newTaskDisplay.innerHTML = "";
}

function deleteCard() {

}