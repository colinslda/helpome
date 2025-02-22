function showSection(sectionId) {
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    loadBills();
    loadItems();
    notifyDueTasks(); // Nouvelle fonctionnalité
});
