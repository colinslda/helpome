let tasks = loadData('tasks');

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskDate = document.getElementById('taskDate');
    const task = taskInput.value.trim();
    const dueDate = taskDate.value;
    if (task) {
        tasks.push({ text: task, dueDate, completed: false, notified: false });
        taskInput.value = '';
        taskDate.value = '';
        saveData('tasks', tasks);
        renderTasks();
    }
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)); // Tri par date
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
            <span>${task.text} ${task.dueDate ? `(${task.dueDate})` : ''}</span>
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
    requestNotificationPermission();
}
