// query selectors //
var searchBtn = document.querySelector(".btn__search");
var searchInput = document.querySelector(".input__search");
var taskTitleInput = document.querySelector(".input__title");
var newTaskDisplay = document.querySelector(".side-bar__task-display");
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
var createTasks = JSON.parse(localStorage.getItem("tasks")) || [];

// starting //

if(createTasks.length != 0) {
  onLoad();
  pageRefresh(createTasks);
}

// event listeners //

addTaskBtn.addEventListener("click", addToList);

// functions //

function saveNewTask(id, title, tasks, urgent) {
  var newTask = new ToDoList(Date.now(), taskTitleInput.value, taskItemInput.value);
  createTasks.push(newTask);
  newTask.saveToStorage(createTasks);
  addTaskCard(newTask);
}

function createTaskItem() {
  newTaskDisplay.innerHTML
}

function addToList() {

}

function addTaskCard(tasks) {
  taskPlaceholder.classList.add("hidden");
  mainContainer.innerHTML = `<article class="task__list-card" data-id="${tasks.id}">
        <h2 class="border__card-title">${tasks.title}</h2>
        <ul class="task__list">
          <li class="task__list-item">${tasks.body}</li>
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
}