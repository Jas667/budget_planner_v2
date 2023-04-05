const db = require('./queries.js');
const pool = require('../../database.js');

const getAllExpenses = (req, res) => {
    pool.query(db.getAllExpensesQuery, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(results.rows);
    });
};

const getExpenseById = (req, res) => {
    const id = req.params.id;
    pool.query(db.getExpenseByIdQuery, [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).send(results.rows);
    })
};

const getExpensesByCategory = (req, res) => {
    const id = req.params.id;
    pool.query(db.getExpensesByCategoryQuery, [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).send(results.rows);
    })
};

const deleteExpenseById = (req, res) => {
    const id = req.params.id;
    pool.query(db.deleteExpenseByIdQuery, [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(204).send({ deleted: `deleted expense with id: ${id} successfully!` })
    })
};

const updateExpenseById = (req, res) => {
    const {amount, date, categories_id, expenses_id} = req.body;

    pool.query(db.updateExpenseByIdQuery, [amount, date, categories_id, expenses_id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).send({ updated: `updated expense with id: ${expenses_id} successfully!` })
    })
};

const addNewExpense = (req, res) => {
    const {amount, date, categories_id} = req.body;

    pool.query(db.addNewExpenseQuery, [amount, date, categories_id], (error, results) => {
        if (error) {
            //handle error of categories_id not existing in categories table
            if (error.code === '23503') {
                res.status(400).send({ error: `category with id: ${categories_id} does not exist` });
            }
        } else {
            res.status(201).send({ created: `created new expense with amount: ${amount}, date: ${date}, and category id: ${categories_id}` });
        }
    })
}; 



module.exports = {
    getAllExpenses,
    getExpenseById,
    getExpensesByCategory,
    deleteExpenseById,
    updateExpenseById,
    addNewExpense,
};
