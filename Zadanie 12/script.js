window.onload = function () {
    const taskForm = document.querySelector("#taskForm");
    const taskInput = document.querySelector("#taskInput");
    const taskList = document.querySelector("#taskList");
    const clearCompleted = document.querySelector("#clearCompleted");
    const filters = document.querySelectorAll(".filter");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let currentFilter = "all";
    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    function renderTasks() {
      taskList.innerHTML = "";
      const filteredTasks = tasks.filter(function (task) {
        if (currentFilter === "active") {
          return !task.completed;
        }
        if (currentFilter === "completed") {
          return task.completed;
        }
        return true;
      });
      if (filteredTasks.length === 0) {
        const emptyMessage = document.createElement("li");
        emptyMessage.className = "empty";
        emptyMessage.textContent = "Brak zadań";
        taskList.appendChild(emptyMessage);
        return;
      }
      filteredTasks.forEach(function (task) {
        const li = document.createElement("li");
        li.className = "task";
        if (task.completed) {
          li.classList.add("completed");
        }
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        const text = document.createElement("span");
        text.textContent = task.text;
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete";
        deleteButton.textContent = "Usuń";
        checkbox.addEventListener("change", function () {
          task.completed = checkbox.checked;
          saveTasks();
          renderTasks();
        });
        deleteButton.addEventListener("click", function () {
          tasks = tasks.filter(function (item) {
            return item.id !== task.id;
          });
          saveTasks();
          renderTasks();
        });
        li.appendChild(checkbox);
        li.appendChild(text);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
      });
    }
    taskForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const text = taskInput.value.trim();
      if (text === "") {
        return;
      }
      const task = {
        id: Date.now(),
        text: text,
        completed: false
      };
      tasks.push(task);
      saveTasks();
      taskInput.value = "";
      renderTasks();
      taskInput.focus();
    });
    filters.forEach(function (filter) {
      filter.addEventListener("click", function () {
        filters.forEach(function (button) {
          button.classList.remove("active");
        });
        filter.classList.add("active");
        currentFilter = filter.dataset.filter;
        renderTasks();
      });
    });
    clearCompleted.addEventListener("click", function () {
      tasks = tasks.filter(function (task) {
        return !task.completed;
      });
      saveTasks();
      renderTasks();
    });
    renderTasks();
};

