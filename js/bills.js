let bills = loadData('bills');

document.getElementById('billUpload').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            bills.push({ name: file.name, data: reader.result });
            saveData('bills', bills);
            renderBills();
        };
        reader.readAsDataURL(file);
    }
});

function renderBills() {
    const billList = document.getElementById('billList');
    billList.innerHTML = '';
    bills.forEach((bill, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <a href="${bill.data}" target="_blank">${bill.name}</a>
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
