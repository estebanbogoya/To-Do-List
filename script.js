const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
let tasks = [];

// cargar tareas previas almacenadas en localStorage (si existen)
if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks.forEach((task) => {
    addTaskToList(task);
  });
}

// agregar tarea a la lista y al array de tareas
function addTask(event) {
  event.preventDefault(); // evita que el formulario se envíe y se actualice la página
  const task = taskInput.value.trim();
  if (task) {
    addTaskToList(task);
    tasks.push(task);
    saveTasks();
    taskInput.value = '';
  }
}

// agregar tarea a la lista y al array de tareas
function addTaskToList(task) {
  const li = document.createElement('li');
  li.innerText = task;
  taskList.appendChild(li);
  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'X';
  deleteBtn.classList.add('delete-btn');
  li.appendChild(deleteBtn);
}

// eliminar tarea de la lista y del array de tareas
function removeTask(event) {
  if (event.target.classList.contains('delete-btn')) {
    const taskItem = event.target.parentElement;
    const taskIndex = Array.from(taskList.children).indexOf(taskItem);
    tasks.splice(taskIndex, 1);
    saveTasks();
    taskItem.remove();
  }
}

// guardar tareas en localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

addTaskBtn.addEventListener('click', addTask);
taskList.addEventListener('click', removeTask);
