let tasks = loadData('tasks');

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value.trim();
    if (task) {
        tasks.push({ text: task, completed: false });
        taskInput.value = '';
        saveData('tasks', tasks);
        renderTasks();
    }
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
            <span>${task.text}</span>
            <button onclick="deleteTask(${index})">Supprimer</button>
        `;
        taskList.appendChild(li);
    });
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveData('tasks', tasks);
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveData('tasks', tasks);
    renderTasks();
}

function loadTasks() {
    renderTasks();
}
