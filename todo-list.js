class ToDoList {
  constructor(id, title, tasks, urgent, urgentIcon) {
    this.id = id;
    this.title = title;
    this.tasks = tasks;
    this.urgent = urgent || true;
    this.urgentIcon = urgentIcon || "images/delete-active.svg"
  }

  saveToStorage(createTasks) {
    var stringified = JSON.stringify(createTasks);
    console.log(strinified);
      localStorage.setItem("array", stringified);
  }

  deleteFromStorage() {

  }

  updateToDo() {
    //update todo's title and urgency

  }

  updateTask() {
    //update tasks content and if it is completed

  }
}