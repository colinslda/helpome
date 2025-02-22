let items = loadData('items');

function addItem() {
    const itemInput = document.getElementById('itemInput');
    const locationInput = document.getElementById('locationInput');
    const item = itemInput.value.trim();
    const location = locationInput.value.trim();
    if (item && location) {
        items.push({ name: item, location });
        itemInput.value = '';
        locationInput.value = '';
        saveData('items', items);
        renderItems();
    }
}

function renderItems() {
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = '';
    items.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} - ${item.location}
            <button onclick="deleteItem(${index})">Supprimer</button>
        `;
        itemList.appendChild(li);
    });
}

function deleteItem(index) {
    items.splice(index, 1);
    saveData('items', items);
    renderItems();
}

function loadItems() {
    renderItems();
}
