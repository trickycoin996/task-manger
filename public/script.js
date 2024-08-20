document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.querySelector('#task-form form');
  const taskNameInput = document.querySelector('#taskName');
  const tasksList = document.querySelector('#tasks-list ul');

  // Fetch tasks on page load
  fetchTasks();

  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskName = taskNameInput.value;
    if (taskName) {
      addTask(taskName);
    }
  });

  // Function to fetch tasks from the server
  function fetchTasks() {
    fetch('/tasks')
      .then(response => response.json())
      .then(tasks => {
        tasksList.innerHTML = '';
        tasks.forEach(task => {
          const li = document.createElement('li');
          li.className = 'list-group-item task-item';
          li.innerHTML = `${task.name} <button class="btn btn-sm btn-delete" onclick="deleteTask('${task._id}')">Delete</button>`;
          tasksList.appendChild(li);
        });
      });
  }

  // Function to add a task
  function addTask(name) {
    fetch('/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    })
    .then(response => response.json())
    .then(() => {
      taskNameInput.value = '';
      fetchTasks();
    });
  }

  // Function to delete a task
  window.deleteTask = function(id) {
    fetch(`/tasks/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      fetchTasks();
    });
  }
});
