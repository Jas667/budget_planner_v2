const Pool = require('pg').Pool;

//create pool for database
const pool = new Pool({
    database: "personal_budget_v2",
    port: 5432,
    host: "localhost",
    user: "postgres",
    password: 'postgres',
});

module.exports = pool;