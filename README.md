# Personal Budget V2
## Codecademy Project - Back-end Engineering

Personal Budget V2 was built using the PERN stack. It is a personal budget application deployed to Heroku

### General:

Complete rebuild of Personal Budget V1, with the intention of using a Heroku postgresql database. All expenses are stored in one 'expenses' table rather than being divided into individual tables due to cost constraints using the Heroku site.

Building this project offered a wealth of experience using the PERN stack. The main issues in development came from some of the sql queries, and I learned a lot whilst building.

### Current Database Layout

![Database Layout](readme_imgs/Database%20Layout.png)

### Features & How to Use:

#### Homepage

Cash balance can be adjusted/reset at any time from homescreen. The cash balance will then be adjusted as each new expense is added, deleted, or edited. Cash balance will NOT be adjusted on full delete of a category, with the reasoning being that a user may be deleting many months woth of expenses in that case.

New categories can be added. Categories can be edited, and expenses worked on, by clicking on an individual category.

All expenses are listen at the botton, ordered by date.

#### Single Category Page

On this page you can delete the full category, which will delete all associated expenses, but not adjust the cash balance.

Deleting, adding, or updating individual expenses can also be done. User will then be prompted to pick if they wish cash balance to also be adjusted.

To work with an individual expense, simply click on it and it will be added to the 'Currently Selected Expense' section.

#### If Using on Your Computer

The Personal Budget V2 is set up to deploy to Heroku. In order to run on local computer, database.js will need to be updated and a database created to suit (diagram above). Primary keys are set to SERIAL to auto-increment. The foreign key in expenses should be set to ON DELETE CASCADE. That allows all expenses to be deleted if a category is removed.

updated database file:

const Pool = require('pg').Pool;

//create pool for database
const pool = new Pool({
    database: "personal_budget_v2",
    port: 5432,
    host: "localhost",
    user: "postgres",
    password: '',
});

module.exports = pool;

### Technologies:

Basic use of HTML to structure the page. CSS was used for styling. Javascript, Node.js, and Express to create functionality, with postgresql as the database (PERN stack)

### Licence

Open.