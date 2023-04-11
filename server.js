//web app framework
const express = require('express'); // import express module (simplifies routing/requests, among other things)
const app = express(); // create an instance of the express module (app is the conventional variable name used)
const categoriesRouter = require('./src/categories/routes.js')
const expensesRouter = require('./src/expenses/routes.js')
const cashBalanceRouter = require('./src/currentBalance/routes.js')

//for parsing incoming into json
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

//expect and parse json
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//serve static files from public folder - css, js, and index.html
app.use(express.static('public'));

//router for categories
app.use('/categories', categoriesRouter);
app.use('/expenses', expensesRouter);
app.use('/cashbalance', cashBalanceRouter);

//serve homepage (index.html)
app.get('/', (req, res) => {
    res.status(200).send();
})


app.listen(PORT, () => { // start server and listen on specified port
    console.log(`App listening on port: ${PORT}`); // confirm server is running and log port to the console
});