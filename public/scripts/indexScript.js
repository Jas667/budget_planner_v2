const displayCashBalance = async () => {
    try {
        const cashBalanceSpan = document.getElementById('currentBalance');
        //query to return current cash balance
        const results = await fetch('https://budget-planner-v2.herokuapp.com/cashbalance', {method: 'GET'});
        const cashBalance = await results.json();
        //display current cash balance. cash_balance is the column name in the cash_balance table. Position 0 is the first row in the table which is where cash balance is stored.
        cashBalanceSpan.innerHTML = `${cashBalance[0].cash_balance}`;
    } catch (error) {
        console.log("Error getting cash balance: ", error);
    }
};

const displayCategoryEnvelopes = async () => {
    try {
        const categoryEnvelopesList = document.getElementById("categoryEnvelopesList");

        const results = await fetch('https://budget-planner-v2.herokuapp.com/categories', {method: 'GET'})
        const categories = await results.json();

        categories.forEach(category => {

            const categoryEnvelopeDisplay = document.createElement("div");
            categoryEnvelopeDisplay.classList.add("categoryEnvelopeDisplay");
            categoryEnvelopeDisplay.innerHTML = `<h3>${category.name}</h3>`;

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

        const results = await fetch('https://budget-planner-v2.herokuapp.com/expenses', {method: 'GET'});
        const expenses = await results.json();

        expenses.forEach(expense => {
            const expenseDisplay = document.createElement('div');
            expenseDisplay.classList.add('expenseDisplay');
            expenseDisplay.innerHTML = `<b>Category: ${expense.name}<p>Amount: ${expense.amount}<p>Date: ${expense.date}`;

            //add id to expenseDisplay
            expenseDisplay.id = expense.expenses_id;

            expensesDiv.appendChild(expenseDisplay);
        });
    } catch (error) {
        console.log("Error getting expenses: ", error);
    }
}

displayCashBalance();
displayCategoryEnvelopes();
displayAllExpenses();


//event listeners will be added below here

//get IDs of all elements that will be used in the event listener to toggle between showing and hiding the input field and submit button
const adjustCashButton = document.getElementById('adjustCashButton');
const currentBalanceSection = document.getElementById('currentBalance');
const currentBalanceLabel = document.getElementById('currentBalanceLabel');
const adjustCashInput = document.getElementById('adjustCashInput');
const confirmAdjustCashButton = document.getElementById('confirmAdjustCashButton');
const cancelButton = document.getElementById('cancelButton');


//event listener which will show input field and submit button when adjust cash button is clicked
adjustCashButton.addEventListener('click', async () => {
    adjustCashButton.style.display = 'none';
    currentBalanceSection.style.display = 'none';
    currentBalanceLabel.style.display = 'none';
    adjustCashInput.style.display = 'inline-flex';
    confirmAdjustCashButton.style.display = 'inline-flex';
    cancelButton.style.display = 'inline-flex';
});

confirmAdjustCashButton.addEventListener('click', async () => {
    try {
        //get the value of the input field
        const newCashBalance = await Number(adjustCashInput.value);

        //update the cash balance in the database
        const results = await fetch('https://budget-planner-v2.herokuapp.com/cashbalance', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({cash_balance: newCashBalance})});
        const cashBalance = await results.json();
    } catch (error) {
        console.log("Error updating cash balance: ", error);
    } finally {
        //HIDE USED ELEMENTS AND DISPLAY NEW CASH BALANCE
        adjustCashButton.style.display = 'inline-flex';
        currentBalanceSection.style.display = 'inline-flex';
        currentBalanceLabel.style.display = 'inline-flex';
        adjustCashInput.style.display = 'none';
        confirmAdjustCashButton.style.display = 'none';
        cancelButton.style.display = 'none';
        displayCashBalance();
    }
});


//add event listener to dynamically added categories in categoryEnvelopesList on click to retrieve the id for that category
const categoryEnvelopesList = document.getElementById('categoryEnvelopesList');
//add event listener so the user can click on a category and be directed to the single category page for that category
categoryEnvelopesList.addEventListener('click', async (category) => {
    if (category.target.classList.contains('categoryEnvelopeDisplay')) {
        //get the id of the category that was clicked;
        const categoryId = category.target.id;
        //redirect to singleCategoryPage and send categoryId as a query parameter
        window.location.href = `https://budget-planner-v2.herokuapp.com/singleCategoryPage.html?categoryId=${categoryId}`;
    }
});








// //select parent container of activities in order to delete activities. Because each activity is added dynamically, this is necessary.
// const activityContainer = document.getElementById('toDoSection');
// //add event listener and find which activity was clicked so that ID can be selected for delete.
// activityContainer.addEventListener('click', async (activity) => {
//     //variable to track whether user confirms delete request
//     let confirmDelete = false;

//     if (activity.target.classList.contains('activity')) {
//         //use confirm window to confirm user delete request. Display text of selected activity to user for confirm.
//         if (window.confirm(`Are you sure you want to delete activity: ${activity.target.innerHTML}`)) {
//             try {
//                 //fetch request to delete activity if user confirms
//                 const result = await fetch(`https://budget-planner-v2.herokuapp.com/todo/${activity.target.id}`, {method: 'DELETE'});
//                 //reload activities after delete has processed
//                 readActivities();

//             } catch(e) {
//                 console.log('Error deleting activity.')
//             }
//         } else {
//             return;
//         }
//     }
// })

