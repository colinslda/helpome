document.getElementById('searchInput').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const results = [];
    
    // Recherche dans les tâches
    tasks.forEach(task => {
        if (task.text.toLowerCase().includes(query)) {
            results.push(`Tâche: ${task.text}`);
        }
    });
    
    // Recherche dans les factures
    bills.forEach(bill => {
        if (bill.name.toLowerCase().includes(query)) {
            results.push(`Facture: ${bill.name}`);
        }
    });
    
    // Recherche dans les objets
    items.forEach(item => {
        if (item.name.toLowerCase().includes(query) || item.location.toLowerCase().includes(query)) {
            results.push(`Objet: ${item.name} (${item.location})`);
        }
    });
    
    renderSearchResults(results);
});

function renderSearchResults(results) {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';
    results.forEach(result => {
        const li = document.createElement('li');
        li.textContent = result;
        searchResults.appendChild(li);
    });
}
