function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function notifyDueTasks() {
    const tasks = loadData('tasks');
    const today = new Date().toISOString().split('T')[0];
    tasks.forEach(task => {
        if (task.dueDate === today && !task.completed && !task.notified) {
            if ('Notification' in window && Notification.permission === 'granted') {
                new Notification('Tâche à faire aujourd’hui : ' + task.text);
            }
            task.notified = true;
            saveData('tasks', tasks);
        }
    });
}

function requestNotificationPermission() {
    if ('Notification' in window && Notification.permission !== 'granted') {
        Notification.requestPermission();
    }
}
