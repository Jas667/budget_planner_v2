const getAllCategoriesQuery = `SELECT * FROM categories`;
const getAllCategoriesInfoQuery = 
`SELECT categories_id, name, starting_budget, total_expenses, (starting_budget - total_expenses) AS remaining_budget
FROM
(SELECT categories.categories_id, categories.name, categories.starting_budget, SUM(expenses.amount) AS total_expenses
FROM categories
JOIN expenses
	ON categories.categories_id = expenses.categories_id
GROUP BY categories.categories_id, categories.starting_budget, categories.name) AS categories_expenses_totals`;




const getCategoryByIdQuery = `SELECT * FROM categories WHERE categories_id = $1`;
const getCategoryByName = `SELECT * FROM categories WHERE name = $1`;
const deleteCategoryByIdQuery = `DELETE FROM categories WHERE categories_id = $1`;
const addNewCategoryQuery = `INSERT INTO categories (name, starting_budget) VALUES ($1, $2)`;

module.exports = {
    getAllCategoriesQuery,
    getAllCategoriesInfoQuery,
    getCategoryByIdQuery,
    deleteCategoryByIdQuery,
    addNewCategoryQuery,
    getCategoryByName
}