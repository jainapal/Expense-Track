document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expense-form");
    const expenseName = document.getElementById("expense-name");
    const expenseAmount = document.getElementById("expense-amount");
    const expenseCategory = document.getElementById("expense-category");
    const expenseList = document.getElementById("expenses");
    const totalAmount = document.getElementById("total-amount");
    const categoryFilter = document.getElementById("category-filter");
  
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let total = calculateTotal(expenses);
  
    renderExpenses(expenses);
    totalAmount.textContent = total;
  
    expenseForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const name = expenseName.value.trim();
      const amount = parseFloat(expenseAmount.value);
      const category = expenseCategory.value;
  
      if (!name || !amount || amount <= 0) {
        alert("Please enter valid details!");
        return;
      }
  
      const expense = { id: Date.now(), name, amount, category };
      expenses.push(expense);
  
      updateLocalStorage();
      renderExpenses(expenses);
      total = calculateTotal(expenses);
      totalAmount.textContent = total;
  
      expenseName.value = "";
      expenseAmount.value = "";
    });
  
    expenseList.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete")) {
        const id = parseInt(e.target.dataset.id);
        expenses = expenses.filter((expense) => expense.id !== id);
  
        updateLocalStorage();
        renderExpenses(expenses);
        total = calculateTotal(expenses);
        totalAmount.textContent = total;
      }
    });
  
    categoryFilter.addEventListener("change", (e) => {
      const filter = e.target.value;
      const filteredExpenses =
        filter === "All" ? expenses : expenses.filter((exp) => exp.category === filter);
      renderExpenses(filteredExpenses);
    });
  
    function renderExpenses(expensesToRender) {
      expenseList.innerHTML = "";
      expensesToRender.forEach((expense) => {
        const li = document.createElement("li");
        li.innerHTML = `
          ${expense.name} - ₹${expense.amount} (${expense.category})
          <button class="delete" data-id="${expense.id}">X</button>
        `;
        expenseList.appendChild(li);
      });
    }
  
    function calculateTotal(expenses) {
      return expenses.reduce((sum, expense) => sum + expense.amount, 0);
    }
  
    function updateLocalStorage() {
      localStorage.setItem("expenses", JSON.stringify(expenses));
    }
  });
  