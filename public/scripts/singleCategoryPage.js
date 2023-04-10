const getCategoryId = async () => {
    const queryString = await window.location.search;
    const urlParams = await new URLSearchParams(queryString);
    const categoryId = await urlParams.get('categoryId');
    return categoryId;
};

const displayCashBalance = async () => {
    try {
        const cashBalanceSpan = document.getElementById('currentBalance');
        //query to return current cash balance
        const results = await fetch('http://localhost:3000/cashbalance', {method: 'GET'});
        const cashBalance = await results.json();
        //display current cash balance. cash_balance is the column name in the cash_balance table. Position 0 is the first row in the table which is where cash balance is stored.
        cashBalanceSpan.innerHTML = `${cashBalance[0].cash_balance}`;
    } catch (error) {
        console.log("Error getting cash balance: ", error);
    }
};


const displaySingleCategory = async () => {
    try {
        const categoryId = await getCategoryId();

        const categoryEnvelopesList = document.getElementById("categoryEnvelopesList");

        const results = await fetch(`http://localhost:3000/categories/${categoryId}`, {method: 'GET'})
        const category = await results.json();

        //remove all child elements from categoryEnvelopesList
        while (categoryEnvelopesList.firstChild) {
            categoryEnvelopesList.removeChild(categoryEnvelopesList.firstChild);
        };


            const categoryEnvelopeDisplay = document.createElement("div");
            categoryEnvelopeDisplay.classList.add("categoryEnvelopeDisplay");
            categoryEnvelopeDisplay.innerHTML = `<h3>${category[0].name}</h3>`;

            //add id to categoryEnvelopeDisplay
            categoryEnvelopeDisplay.id = category[0].id;

            categoryEnvelopesList.appendChild(categoryEnvelopeDisplay);
    } catch (error) {
        console.log("Error getting category: ", error);
    }
};

const displaySingleExpense = async (expenseId) => {
    try {

        const currentlySelectedExpense = document.getElementById("currentlySelectedExpense");

        const results = await fetch(`http://localhost:3000/expenses/${expenseId}`, {method: 'GET'})
        const expense = await results.json();

        //remove all child elements from currentlySelectedExpense
        while (currentlySelectedExpense.firstChild) {
            currentlySelectedExpense.removeChild(currentlySelectedExpense.firstChild);
        };


            const singleExpenseDisplay = document.createElement("div");
            singleExpenseDisplay.classList.add("singleExpenseDisplay");
            singleExpenseDisplay.innerHTML = `<b>Amount: ${expense[0].amount}<p>Date: ${expense[0].date}`;

            //add id to singleExpenseDisplay
            singleExpenseDisplay.id = expense[0].expenses_id;

            currentlySelectedExpense.appendChild(singleExpenseDisplay);
    } catch (error) {
        console.log("Error getting category: ", error);
    }
};

const displayExpensesForCategory = async () => {
    try {

        const categoryId = await getCategoryId();

        const expensesDiv = document.getElementById('expenses');

        const results = await fetch(`http://localhost:3000/expenses/category/${categoryId}`, {method: 'GET'});
        const expenses = await results.json();

        //Delete all child elements displaying expenses and re-load them. This allows for no duplicates after delete/add/update
        while (expensesDiv.firstChild) {
            expensesDiv.removeChild(expensesDiv.firstChild);
        };

        expenses.forEach(expense => {
            const expenseDisplay = document.createElement('div');
            expenseDisplay.classList.add('expenseDisplay');
            expenseDisplay.innerHTML = `<b>Amount: ${expense.amount}<p>Date: ${expense.date}`;

            //add id to expenseDisplay
            expenseDisplay.id = expense.expenses_id;

            expensesDiv.appendChild(expenseDisplay);
        });
    } catch (error) {
        console.log("Error getting expenses: ", error);
    }
}

const deleteNewCategoryButton = document.getElementById('deleteNewCategoryButton');

deleteNewCategoryButton.addEventListener('click', async (event) => {
    const categoryId = await getCategoryId();

    try {
        const confirm = window.confirm("Are you sure you want to delete this category? This will also delete all expenses associated with this category. Cash balance will NOT be adjusted.");
        if (confirm) {
            const results = await fetch(`http://localhost:3000/categories/${categoryId}`, {method: 'DELETE'});
            console.log("Category deleted");
            window.location.href = "http://localhost:3000/";
        }
    } catch (error) {
        console.log("Error deleting category: ", error);
    }
});


displaySingleCategory();
displayExpensesForCategory();
displayCashBalance();

//event listeners will be added below here
//add event listener on click to all dynamically added expenses
const expenses = document.getElementById('expenses');
expenses.addEventListener('click', async (expense) => {
    if (expense.target.classList.contains('expenseDisplay')) {
        //get the id of the expense that was clicked;
        const categoryId = await expense.target.id;
        
        displaySingleExpense(categoryId);
    }
});


//delete single expense by adding click event listener to deleteSelectedExpenseButton
const deleteSelectedExpenseButton = document.getElementById('deleteSelectedExpenseButton');
deleteSelectedExpenseButton.addEventListener('click', async (event) => {
    try {
        const currentlySelectedExpense = await document.getElementById("currentlySelectedExpense");

        //if currentlySelectedExpense has no child elements then no expense has been selected. Alert user to select an expense
        if (!currentlySelectedExpense.firstChild) {
            alert("Please select an expense to delete");
            return;
        }

        //get id of currently selected expense
        const expenseId = await currentlySelectedExpense.firstChild.id;

        //if expenseId is undefined then no expense has been selected. Alert user to select an expense
        if (!expenseId) {
            alert("Please select an expense to delete");
                //exit function
                return;
            }
    

        const confirm = window.confirm("Are you sure you want to delete this expense?");
        if (confirm) {

            //check if user would like to also adjust cash balance when they delete an expense
            const adjustCashBalance = window.confirm("Would you like to adjust your cash balance when you delete this expense?");
            if (adjustCashBalance) {
                //query expenses and get amount of currently selected expense
                const expenseResults = await fetch(`http://localhost:3000/expenses/${expenseId}`, {method: 'GET'});
                const expense = await expenseResults.json();
                //get the amount from the expense
                const amountOfExpense = expense[0].amount;

                //update cash balance
                const cashBalanceUpdate = await fetch('http://localhost:3000/cashbalance/add', {method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({cash_balance: amountOfExpense})});

                //delete expense
                const results = await fetch(`http://localhost:3000/expenses/${expenseId}`, {method: 'DELETE'});

            } else {
                //this else statement handles if user decides NOT to update cash balance when deleting an expense
                const results = await fetch(`http://localhost:3000/expenses/${expenseId}`, {method: 'DELETE'});
            }
        }
    } catch (error) {
        console.log("Error deleting expense: ", error);
    } finally {

        displaySingleCategory();
        displayExpensesForCategory();
        displayCashBalance();
        
        //remove all child elements from currentlySelectedExpense to clear out the expense that was deleted
        while (currentlySelectedExpense.firstChild) {
            currentlySelectedExpense.removeChild(currentlySelectedExpense.firstChild);
        };
    }
});

//Update single expense by adding click event listener to updateSelectedExpenseButton
const updateSelectedExpenseButton = document.getElementById('updateSelectedExpenseButton');
updateSelectedExpenseButton.addEventListener('click', async (event) => {
    try {
        const currentlySelectedExpense = await document.getElementById("currentlySelectedExpense");
        const expenseId = await currentlySelectedExpense.firstChild.innerHTML;
        
        //if expenseId is undefined then no expense has been selected. Alert user to select an expense
        if (expenseId === undefined) {
            alert("Please select an expense to update");
            return;
        }

        const confirm = window.confirm("Are you sure you want to update this expense?");
        if (confirm) {
            const currentlySelectedExpense = await document.getElementById("currentlySelectedExpense");
            const expenseId = await currentlySelectedExpense.firstChild.id;
            const categoryId = await getCategoryId();

            let amount = await document.getElementById("adjustExpenseInput").value;
            const date = await document.getElementById("adjustDateInput").value;

            if (amount === "" || date === "") {
                alert("Please enter an amount and date");
                return;
            }
            //get the amount of selected expense. This will then be used to determine if the cash balance needs to be updated by adding or subtracting
            const expenseResults = await fetch(`http://localhost:3000/expenses/${expenseId}`, {method: 'GET'});
            const expense = await expenseResults.json();
            const expenseAmount = expense[0].amount;
            //remove first letter from expenseAmount to get rid of the £ sign + make a number rather than string
            const expenseAmountWithoutPoundSign = Number(expenseAmount.substring(1));
            //change amount into number so they can be compared
            amount = Number(amount);

            //check if user would like to also adjust cash balance when they update an expense
            const adjustCashBalance = window.confirm("Would you like to adjust your cash balance when you update this expense?");
            if (adjustCashBalance) {
                //check if the amount of the expense is greater than the new amount. If it is, then the cash balance needs to be updated by subtracting the difference between the two. If it is not, then the cash balance needs to be updated by adding the difference between the two.
                if (expenseAmountWithoutPoundSign > amount) {
                    //update cash balance
                    const cashBalanceUpdate = await fetch('http://localhost:3000/cashbalance/add', {method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({cash_balance: (expenseAmountWithoutPoundSign - amount)})});

                } else {
                    //update cash balance
                    const cashBalanceUpdate = await fetch('http://localhost:3000/cashbalance/subtract', {method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({cash_balance: (amount - expenseAmountWithoutPoundSign)})});
                }
            }
                //update selected expense
                const results = await fetch(`http://localhost:3000/expenses/`, {method: 'PUT', headers: {
                'Content-Type': 'application/json'
                }, body: JSON.stringify({amount: amount, date: date, categories_id: categoryId, expenses_id: expenseId})});

            } 

    } catch (error) {
        console.log("Error updating expense: ", error);
    } finally {

        displaySingleCategory();
        displayExpensesForCategory();
        displayCashBalance();
        
        //remove all child elements from currentlySelectedExpense to clear out the expense that was deleted
        while (currentlySelectedExpense.firstChild) {
            currentlySelectedExpense.removeChild(currentlySelectedExpense.firstChild);
        };
    }
});

//add event listener on click to addNewExpenseButton to add new expense
const addNewExpenseButton = document.getElementById('addNewExpenseButton');
addNewExpenseButton.addEventListener('click', async (event) => {
    try {
        const confirm = window.confirm("Are you sure you want to add this expense?");

        if (confirm) {
            const categoryId = await getCategoryId();

            const amount = await document.getElementById("addExpenseInput").value;
            const date = await document.getElementById("addDateInput").value;

            if (amount === "" || date === "") {
                alert("Please enter an amount and date");
                return;
            }

            //update cash balance, subtracting new expense amount
            const cashBalanceUpdate = await fetch('http://localhost:3000/cashbalance/subtract', {method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({cash_balance: amount})});

            //add selected expense
            const results = await fetch(`http://localhost:3000/expenses/`, {method: 'POST', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({amount: amount, date: date, categories_id: categoryId})});
        }

    } catch (error) {

        console.log("Error updating expense: ", error);

    } finally {
            
            displaySingleCategory();
            displayExpensesForCategory();
            displayCashBalance();

    }
});


