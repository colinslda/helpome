let items = loadData('items');

function addItem() {
    const itemInput = document.getElementById('itemInput');
    const locationInput = document.getElementById('locationInput');
    const itemPhoto = document.getElementById('itemPhoto');
    const item = itemInput.value.trim();
    const location = locationInput.value.trim();
    if (item && location) {
        const photo = itemPhoto.files[0];
        if (photo) {
            const reader = new FileReader();
            reader.onload = () => {
                items.push({ name: item, location, photo: reader.result });
                saveItemInputs();
            };
            reader.readAsDataURL(photo);
        } else {
            items.push({ name: item, location, photo: null });
            saveItemInputs();
        }
    }
}

function saveItemInputs() {
    const itemInput = document.getElementById('itemInput');
    const locationInput = document.getElementById('locationInput');
    const itemPhoto = document.getElementById('itemPhoto');
    itemInput.value = '';
    locationInput.value = '';
    itemPhoto.value = '';
    saveData('items', items);
    renderItems();
}

function renderItems() {
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = '';
    items.sort((a, b) => a.name.localeCompare(b.name)); // Tri alphabétique
    items.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} - ${item.location} ${item.photo ? `<img src="${item.photo}" width="50">` : ''}
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
