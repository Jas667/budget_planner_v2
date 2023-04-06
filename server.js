//web app framework
const express = require('express');
const app = express();
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
//serve static files
app.use(express.static('public'));

//router for categories
app.use('/categories', categoriesRouter);
app.use('/expenses', expensesRouter);
app.use('/cashbalance', cashBalanceRouter);

//serve homepage (index.html)
app.get('/', (req, res) => {
    res.status(200).send();
})


app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
});