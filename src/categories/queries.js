const getAllCategoriesQuery = `SELECT * FROM categories`;
const getCategoryByIdQuery = `SELECT * FROM categories WHERE categories_id = $1`;
const getCategoryByName = `SELECT * FROM categories WHERE name = $1`;
const deleteCategoryByIdQuery = `DELETE FROM categories WHERE categories_id = $1`;
const addNewCategoryQuery = `INSERT INTO categories (name) VALUES ($1)`;

module.exports = {
    getAllCategoriesQuery,
    getCategoryByIdQuery,
    deleteCategoryByIdQuery,
    addNewCategoryQuery,
    getCategoryByName
}