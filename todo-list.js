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
      localStorage.setItem("array", stringified);
  }

  deleteFromStorage(index) {
    lists.splice(index, 1);
    this.saveToStorage(createTasks);
  }

  updateToDo() {
    //update todo's title and urgency
    this.saveToStorage(createTasks);
  }

  updateTask() {
    //update tasks content and if it is completed
    this.saveToStorage(createTasks);
  }

  urgent() {
    this.urgent = !this.urgent;
    this.saveToStorage(createTasks);
  }
}