const getCategoryId = async () => {
    const queryString = await window.location.search;
    const urlParams = await new URLSearchParams(queryString);
    const categoryId = await urlParams.get('categoryId');
    return categoryId;
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

const displayExpensesForCategory = async () => {
    try {
        const categoryId = await getCategoryId();

        const expensesDiv = document.getElementById('expenses');

        const results = await fetch(`http://localhost:3000/expenses/category/${categoryId}`, {method: 'GET'});
        const expenses = await results.json();

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
        const confirm = window.confirm("Are you sure you want to delete this category?");
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