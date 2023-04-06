const getAllExpensesQuery = 
`SELECT expenses.amount, expenses.date, expenses.categories_id, categories.name
FROM expenses
JOIN categories
	ON expenses.categories_id = categories.categories_id`;
const getExpenseByIdQuery = `SELECT * FROM expenses WHERE expenses_id = $1`;
const getExpensesByCategoryQuery = `SELECT * FROM expenses WHERE categories_id = $1`;
const deleteExpenseByIdQuery = `DELETE FROM expenses WHERE expenses_id = $1`;
const updateExpenseByIdQuery = `UPDATE expenses SET amount = $1, date = $2, categories_id = $3 WHERE expenses_id = $4`;
const addNewExpenseQuery = `INSERT INTO expenses (amount, date, categories_id) VALUES ($1, $2, $3)`;


module.exports = {
    getAllExpensesQuery,
    getExpenseByIdQuery,
    getExpensesByCategoryQuery,
    deleteExpenseByIdQuery,
    updateExpenseByIdQuery,
    addNewExpenseQuery,
};