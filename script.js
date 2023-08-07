const expenseForm = document.getElementById('expense-form');
const expensesList = document.getElementById('expenses-list');
const totalExpenses = document.getElementById('total-expenses');

let expenses = [];

// Load expenses from local storage
if (localStorage.getItem('expenses')) {
    expenses = JSON.parse(localStorage.getItem('expenses'));
    updateExpensesList();
    updateTotalExpenses();
}

expenseForm.addEventListener('submit', addExpense);

function addExpense(event) {
    event.preventDefault();
    
    const expenseName = document.getElementById('expense').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);
    
    if (!expenseName || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid expense name and amount.');
        return;
    }
    
    const expense = {
        name: expenseName,
        amount: amount
    };
    
    expenses.push(expense);
    saveExpensesToLocalStorage();
    
    updateExpensesList();
    updateTotalExpenses();
    
    expenseForm.reset();
}

function updateExpensesList() {
    expensesList.innerHTML = '';
    
    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${expense.name}</span>
            <span>$${expense.amount.toFixed(2)}</span>
            <button onclick="deleteExpense(${index})">Delete</button>
        `;
        expensesList.appendChild(li);
    });
}

function updateTotalExpenses() {
    const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    totalExpenses.textContent = `$${total.toFixed(2)}`;
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    saveExpensesToLocalStorage();
    updateExpensesList();
    updateTotalExpenses();
}

function saveExpensesToLocalStorage() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}
