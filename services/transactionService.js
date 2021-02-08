const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

const getTransactionOfPeriod = async (req, res) => {
  const { period } = req.query;
  if (period) {
    const transactionsInPeriod = await TransactionModel.find({
      yearMonth: period,
    });
    const sortedTransactionsInPeriod = transactionsInPeriod.sort(
      (a, b) => a.day - b.day
    );
    res.send(sortedTransactionsInPeriod);
  } else {
    res.status(400).send({
      error:
        'É necessário informar o parâmetro "period", cujo valor deve estar no formato yyyy-mm',
    });
  }
};

const addTransaction = async (req, res) => {
  const {
    description,
    category,
    value,
    type,
    year,
    month,
    day,
    yearMonth,
    yearMonthDay,
  } = req.body;
  try {
    await TransactionModel.create({
      description,
      category,
      value,
      type,
      year,
      month,
      day,
      yearMonth,
      yearMonthDay,
    });
    res.send({ message: 'Transaction was added sucessfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateTransaction = async (req, res) => {
  const {
    description,
    category,
    value,
    type,
    year,
    month,
    day,
    yearMonth,
    yearMonthDay,
    _id,
  } = req.body;
  try {
    await TransactionModel.findByIdAndUpdate(
      { _id },
      {
        description,
        category,
        value,
        type,
        year,
        month,
        day,
        yearMonth,
        yearMonthDay,
      }
    );
    res.send({ message: 'Transaction was updated successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    await TransactionModel.findByIdAndDelete({ _id: id });
    res.send({ message: 'Transaction successfully removed' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getTransactionOfPeriod,
  addTransaction,
  deleteTransaction,
  updateTransaction,
};
