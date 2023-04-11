// const fetch = require('node-fetch'); // import node-fetch (enables the fetch API to be used server-side)
const { Pool } = require('pg'); // import node-postgres

const pool = new Pool({ // create connection to database
  connectionString: process.env.DATABASE_URL,	// use DATABASE_URL environment variable from Heroku app 
  ssl: {
    rejectUnauthorized: false // don't check for SSL cert
  }
});

module.exports = pool;

//if running on local machine, use this code instead of the above code

// const Pool = require('pg').Pool;

// //create pool for database
// const pool = new Pool({
//     database: "personal_budget_v2",
//     port: 5432,
//     host: "localhost",
//     user: "postgres",
//     password: '',
// });

// module.exports = pool;