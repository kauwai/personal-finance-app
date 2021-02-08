const express = require('express');
const transactionRouter = express.Router();
const transactionService = require('../services/transactionService');

transactionRouter.get('/', transactionService.getTransactionOfPeriod);

transactionRouter.post('/', transactionService.addTransaction);

transactionRouter.put('/', transactionService.updateTransaction);

transactionRouter.delete('/:id', transactionService.deleteTransaction);

module.exports = transactionRouter;
