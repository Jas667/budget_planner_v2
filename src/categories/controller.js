const db = require('./queries.js');
const pool = require('../../database.js');

//get all categories
const getAllCategories = (req, res) => {
    pool.query(db.getAllCategoriesQuery, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(results.rows);
    });
};

const getAllCategoriesInfo = (req, res) => {
    pool.query(db.getAllCategoriesInfoQuery, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(results.rows);
    });
};

const getCategoryById = (req, res) => {
    const id = req.params.id;
    pool.query(db.getCategoryByIdQuery, [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).send(results.rows);
    })
};

const deleteById = (req, res) => {
    const id = req.params.id;
    pool.query(db.deleteCategoryByIdQuery, [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(204).send({ deleted: `deleted category with id: ${id} successfully!` })
    })
};

const addNewCategory = (req, res) => {
    //get info from request body
    let {name, starting_budget} = req.body;

    //capitalze first letter of name and set the rest to lowercase
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    //if no starting budget provided, set it to 0. This stops starting budget from being NULL
    if (starting_budget === undefined) {starting_budget = 0;}
    

    //initial query to check if category already exists
    pool.query(db.getCategoryByName, [name], (error, results) => {
        if (results.rows.length > 0) {
            res.status(409).send({ error: `category with name: ${name} already exists` });
        } else {
            //query to add new category
            pool.query(db.addNewCategoryQuery, [name, starting_budget], (error, results) => {
                if (error) {
                    throw error;
                }
                res.status(201).send({ created: `created new category with name: ${name} and starting budget: ${starting_budget}` });
            })
        }
    })
};

module.exports = {
    getAllCategories,
    getAllCategoriesInfo,
    getCategoryById,
    deleteById,
    deleteById,
    addNewCategory,
}