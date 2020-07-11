const express = require('express');
const router = express.Router();
const BankController = require('../controllers/bank');

/**
 * "HTTP GET" request listener used to return all account instances.
 */
router.get('/api/bank/accounts', BankController.getAllAccounts);

/**
 * "HTTP GET" request listener used to return a specific account instance.
 */
router.get('/api/bank/accounts/:id', BankController.getAccount);

/**
 * "HTTP POST" request listener used to create a new customer account.
 */
router.post('/api/bank/customerAccount', BankController.addCustomerAccount);

/**
 * "HTTP POST" request listener used to create a new deposit transaction.
 */
router.post('/api/bank/deposit', BankController.addDeposit);

/**
 * "HTTP POST" request listener used to create a new withdrawal transaction.
 */
router.post('/api/bank/withdrawal', BankController.addWithdrawal);

/**
 * "HTTP POST" request listener used to create a new transfer transaction.
 */
router.post('/api/bank/transfer', BankController.addTransfer);

module.exports = router;
