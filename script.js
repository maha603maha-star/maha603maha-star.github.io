const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const emptyMsg = document.getElementById("emptyMsg");
const countText = document.getElementById("countText");
const filterButtons = document.querySelectorAll(".filter");

let tasks = [];
let currentFilter = "all";

taskForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  tasks.push(task);
  taskInput.value = "";
  showTasks();
});

taskList.addEventListener("click", function(event) {
  const taskItem = event.target.closest(".task");

  if (!taskItem) return;

  const taskId = Number(taskItem.dataset.id);

  if (event.target.classList.contains("checkbox")) {
    tasks = tasks.map(function(task) {
      if (task.id === taskId) {
        task.completed = !task.completed;
      }
      return task;
    });
  }

  if (event.target.classList.contains("delete")) {
    tasks = tasks.filter(function(task) {
      return task.id !== taskId;
    });
  }

  showTasks();
});

filterButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    filterButtons.forEach(function(btn) {
      btn.classList.remove("active");
    });

    button.classList.add("active");
    currentFilter = button.dataset.filter;
    showTasks();
  });
});

function showTasks() {
  taskList.innerHTML = "";

  let filteredTasks = tasks.filter(function(task) {
    if (currentFilter === "completed") return task.completed;
    if (currentFilter === "pending") return !task.completed;
    return true;
  });

  filteredTasks.forEach(function(task) {
    const li = document.createElement("li");
    li.className = task.completed ? "task completed" : "task";
    li.dataset.id = task.id;

    li.innerHTML = `
      <div class="task-left">
        <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}>
        <span>${task.text}</span>
      </div>
      <button class="delete">Delete</button>
    `;

    taskList.appendChild(li);
  });

  updateCount();
  emptyMsg.style.display = filteredTasks.length === 0 ? "block" : "none";
}

function updateCount() {
  const completed = tasks.filter(function(task) {
    return task.completed;
  }).length;

  countText.textContent = completed + " of " + tasks.length + " tasks completed";
}

showTasks();