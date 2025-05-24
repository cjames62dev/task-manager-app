document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("task-form");
  const taskInput = document.getElementById("task");
  const tasksList = document.getElementById("tasks-list");

  function loadTasks() {
    fetch("tasks.php")
      .then(res => res.json())
      .then(data => {
        tasksList.innerHTML = "";
        data.forEach(task => {
          tasksList.innerHTML += `
            <div class="d-flex justify-content-between align-items-center mb-2 ${task.status === 'done' ? 'task-done' : ''}">
              <span>${task.name}</span>
              <div>
                <button class="btn btn-sm btn-success me-1" onclick="markDone(${task.id})">Done</button>
                <button class="btn btn-sm btn-danger" onclick="deleteTask(${task.id})">Delete</button>
              </div>
            </div>`;
        });
      });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    fetch("tasks.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: action=add&name=${encodeURIComponent(taskInput.value)}
    }).then(() => {
      taskInput.value = "";
      loadTasks();
    });
  });

  window.deleteTask = function (id) {
    fetch("tasks.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: action=delete&id=${id}
    }).then(loadTasks);
  };

  window.markDone = function (id) {
    fetch("tasks.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: action=done&id=${id}
    }).then(loadTasks);
  };

  loadTasks();
});