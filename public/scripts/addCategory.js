const displayCategoryEnvelopes = async () => {
    try {
        const categoryEnvelopesList = document.getElementById("categoryEnvelopesList");

        const results = await fetch(`https://budget-planner-v2.herokuapp.com/categories`, {method: 'GET'})
        const categories = await results.json();

        //remove all child elements from categoryEnvelopesList
        while (categoryEnvelopesList.firstChild) {
            categoryEnvelopesList.removeChild(categoryEnvelopesList.firstChild);
        };

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

displayCategoryEnvelopes();


// add new category
const newCategoryName = document.getElementById('newCategoryName');
const newCategoryBudget = document.getElementById('newCategoryBudget');
const createNewCategoryButton = document.getElementById('createNewCategoryButton');

createNewCategoryButton.addEventListener('click', async () => {
    try {
        const newCategoryNameValue = await newCategoryName.value;

        const results = await fetch(`https://budget-planner-v2.herokuapp.com/categories`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({name: newCategoryNameValue})});

        const response = await results.json();
        console.log(response);
    } catch (error) {
        console.log("Error adding new category: ", error);
    } finally {
    displayCategoryEnvelopes();
    }
});