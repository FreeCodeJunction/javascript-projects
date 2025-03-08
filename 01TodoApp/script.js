class TodoApp {
  constructor() {
    this.listContainer = document.getElementById("list-container");
    this.myTaskClone = document.getElementById("myTask");
    this.textInput = document.getElementById("my-task-input");
    this.addButton = document.getElementById("add-button");
    this.tasks = JSON.parse(localStorage.getItem("myTaskList")) || [];
    this.listContainer.addEventListener("change", (event) =>
      this.makeCheckboxChecked(event)
    );
    this.listContainer.addEventListener("click", (event) =>
      this.commonClickHandler(event)
    );
    this.addButton.addEventListener("click", () => this.addTask());
    this.renderTask();
  }

  saveToLocalStorage() {
    localStorage.setItem("myTaskList", JSON.stringify(this.tasks));
  }

  makeCheckboxChecked(event) {
    const checkbox = event.target;
    if (checkbox.classList.contains("checkbox") && !checkbox.checked) {
      checkbox.checked = !checkbox.checked;
    }
  }

  addTask() {
    const myTask = this.textInput.value.trim();
    if (myTask == "" || myTask.length < 7) {
      alert("Task must be greater than 6 characters");
      return;
    }
    this.tasks.unshift({ text: myTask, completed: false });
    this.saveToLocalStorage();
    this.renderTask();
    this.textInput.value = "";
  }

  renderTask() {
    const taskListHtml = this.tasks
      .map(({ text, completed }, index) => {
        return `<li class="flex justify-between items-center py-2 px-4">
      <div class="text-lg  font-semibold opacity-60">
        <input
          type="checkbox"
          checked
          class="checkbox border-indigo-600 bg-indigo-500 checked:bg-orange-400 ${
            completed ? "" : "hidden"
          }"
        /> <span class="my-task-span cursor-pointer ${
          completed ? "line-through" : ""
        } tracking-wide decoration-[2px]" data-index="${index}">${text}</span>

      </div>

      <button class="btn btn-error task-remove-btn" data-index="${index}">Remove</button>
    </li>`;
      })
      .join("");
    this.listContainer.innerHTML = taskListHtml;
  }

  toggleCompleted(index) {
    this.tasks = this.tasks.map((task, i) => {
      return index === i ? { ...task, completed: !task.completed } : task;
    });
    this.saveToLocalStorage();
    this.renderTask();
  }

  commonClickHandler(event) {
    const element = event.target;
    if (element.classList.contains("my-task-span")) {
      this.toggleCompleted(+element.dataset.index);
    }
    if (element.classList.contains("task-remove-btn")) {
      this.removeTask(+element.getAttribute("data-index"));
    }
  }

  removeTask(index) {
    this.tasks.splice(index, 1);
    this.saveToLocalStorage();
    this.renderTask();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new TodoApp();
});
