let budget = 0;
let expenses = JSON.parse(localStorage.getItem("expenses") || "[]");

document.addEventListener("DOMContentLoaded", () => {
    budget = Number(localStorage.getItem("budget")) || 0;
    updateUI();
});

function setBudget() {
    const budgetInput = document.getElementById("budget");
    budget = Number(budgetInput.value);
    localStorage.setItem("budget", budget.toString());
    updateUI();
}

function addExpense() {
    const nameInput = document.getElementById("expense-name");
    const amountInput = document.getElementById("expense-amount");
    const categoryInput = document.getElementById("expense-category");

    if (!nameInput.value || !amountInput.value) {
        alert("Please enter a valid expense name and amount.");
        return;
    }

    const newExpense = {
        id: Date.now(),
        name: nameInput.value,
        amount: Number(amountInput.value),
        category: categoryInput.value,
    };

    expenses.push(newExpense);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    nameInput.value = "";
    amountInput.value = "";
    updateUI();
}

function removeExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    updateUI();
}

function updateUI() {
    const remainingEl = document.getElementById("remaining");
    const expenseList = document.getElementById("expense-list");

    const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const remaining = budget - totalSpent;

    remainingEl.textContent = `$${remaining}`;

    if (remaining < 0) {
        remainingEl.style.color = "red";
        alert("Warning! You have exceeded your budget!");
    } else {
        remainingEl.style.color = "black";
    }

    expenseList.innerHTML = "";
    expenses.forEach(expense => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${expense.name}</td><td>$${expense.amount}</td><td>${expense.category}</td><td><button onclick="removeExpense(${expense.id})">Delete</button></td>`;
        expenseList.appendChild(row);
    });
}
