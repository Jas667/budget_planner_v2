const getCurrentBalanceQuery = `SELECT cash_balance FROM cash_balance WHERE id = 1`;
const updateCashBalanceQuery = `UPDATE cash_balance SET cash_balance = $1 WHERE id = 1`;

module.exports = {
    getCurrentBalanceQuery,
    updateCashBalanceQuery,
}