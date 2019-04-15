class ToDoList {
  constructor(id, title, urgent, tasks) {
    this.id = id;
    this.title = title;
    this.urgent = urgent || false;
    this.tasks = tasks || [];
  }

  saveToStorage(createTasks) {
      localStorage.setItem("saveTasks", JSON.stringify(createTasks));
  }

  deleteFromStorage(index) {
    createTasks.splice(index, 1);
    this.saveToStorage(createTasks);
  }

  updateToDo(click) {
    if(click.matches(".input__title")) {
      this.title = click.innerText;
    }
    if(click.matches(".btn__urgent-task")) {
      this.urgent = !this.urgent;
    }
    this.saveToStorage(createTasks);
  }

  updateTask(click, index) {
    if(click.matches(".task__list-item")) {
      this.tasks[index].content = click.innerText;
    }
    if(click.matches(".check-item")) {
      this.tasks[index].checked = !this.tasks[index].checked;
    }
    this.saveToStorage(createTasks);
  }
}

