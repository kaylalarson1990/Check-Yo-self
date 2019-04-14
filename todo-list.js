class ToDoList {
  constructor(id, title, urgent, tasks) {
    this.id = id;
    this.title = title;
    this.urgent = false;
    this.tasks = tasks || [];
    // this.urgentIcon = urgentIcon || "images/delete-active.svg"
  }

  saveToStorage(createTasks) {
      localStorage.setItem("saveTasks", JSON.stringify(createTasks));
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
