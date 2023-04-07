const db = require('./queries.js');
const pool = require('../../database.js')

const getCurrentBalance = (req, res) => {
    pool.query(db.getCurrentBalanceQuery, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(results.rows)
    })
};

const updateCurrentBalance = (req, res) => {
    const { cash_balance } = req.body

    pool.query(db.updateCashBalanceQuery, [cash_balance], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send({created: `Cash balance has been updated to: ${cash_balance}`})
    })
};

const addToCurrentBalance = (req, res) => {
    const { cash_balance } = req.body

    pool.query(db.addToCashBalance, [cash_balance], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send({created: `Cash balance has been updated!`})
    })
};

const subtractFromCurrentBalance = (req, res) => {
    const { cash_balance } = req.body

    pool.query(db.subtractFromCashBalance, [cash_balance], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send({created: `Cash balance has been updated!`})
    })
};


module.exports = {
    getCurrentBalance,
    updateCurrentBalance,
    addToCurrentBalance,
    subtractFromCurrentBalance,
}