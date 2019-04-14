class ToDoList {
  constructor(title, tasks) {
    this.title = title;
    this.tasks = tasks;
    // this.urgent = urgent || false;
    this.id = Date.now();
    // this.urgentIcon = urgentIcon || "images/delete-active.svg"
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

class Items {
  constructor(content) {
    this.content = content;
    this.done = false;
    this.id = Date.now();
  }
}
