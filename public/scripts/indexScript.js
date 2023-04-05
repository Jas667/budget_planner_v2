const displayCategoryEnvelopes = async () => {
    try {
        const categoryEnvelopesList = document.getElementById("categoryEnvelopesList");

        const results = await fetch('http://localhost:3000/categories', {method: 'GET'})
        const categories = await results.json();

        categories.forEach(category => {

            const categoryEnvelopeDisplay = document.createElement("div");
            categoryEnvelopeDisplay.classList.add("categoryEnvelopeDisplay");
            categoryEnvelopeDisplay.innerHTML = `<h3>${category.name}</h3><p>Assigned Monthly Budget: ${category.starting_budget}<p>Current Total Expenses: ${category.total_expenses}<p>Remaining Budget: ${category.remaining_budget}`;

            //add id to categoryEnvelopeDisplay
            categoryEnvelopeDisplay.id = category.categories_id;

            categoryEnvelopesList.appendChild(categoryEnvelopeDisplay);
        });
    } catch (error) {
        console.log("Error getting categories: ", error);
    }
};

const displayAllExpenses = async () => {
    try {
        const expensesDiv = document.getElementById('expenses');

        const results = await fetch('http://localhost:3000/expenses', {method: 'GET'});
        const expenses = await results.json();

        expenses.forEach(expense => {
            const expenseDisplay = document.createElement('div');
            expenseDisplay.classList.add('expenseDisplay');
            expenseDisplay.innerHTML = `<b>Amount: ${expense.amount} - Date: ${expense.date} - Category: ${expense.categories_id}`;

            //add id to expenseDisplay
            expenseDisplay.id = expense.expenses_id;

            expensesDiv.appendChild(expenseDisplay);
        });
    } catch (error) {
        console.log("Error getting expenses: ", error);
    }
}

displayCategoryEnvelopes();
displayAllExpenses();