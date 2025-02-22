let bills = loadData('bills');

function addBill() {
    const billUpload = document.getElementById('billUpload');
    const billCategory = document.getElementById('billCategory');
    const file = billUpload.files[0];
    const category = billCategory.value.trim() || 'Non catégorisé';
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            bills.push({ name: file.name, data: reader.result, category, date: new Date().toISOString() });
            billUpload.value = '';
            billCategory.value = '';
            saveData('bills', bills);
            renderBills();
        };
        reader.readAsDataURL(file);
    }
}

function renderBills() {
    const billList = document.getElementById('billList');
    billList.innerHTML = '';
    bills.sort((a, b) => new Date(b.date) - new Date(a.date)); // Tri par date décroissante
    bills.forEach((bill, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <a href="${bill.data}" target="_blank">${bill.name} (${bill.category})</a>
            <button onclick="deleteBill(${index})">Supprimer</button>
        `;
        billList.appendChild(li);
    });
}

function deleteBill(index) {
    bills.splice(index, 1);
    saveData('bills', bills);
    renderBills();
}

function loadBills() {
    renderBills();
}
