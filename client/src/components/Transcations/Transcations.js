import React from 'react';
import Transaction from './Transaction';
import TransactionService from '../../services/transactionsService';

export default function Transcations({
  transactions,
  onRemovedTransactions,
  onEditedTransactions,
}) {
  const handleRemoveTransactions = (id) => {
    TransactionService.remove(id);
    const updatedTransactions = transactions.filter(({ _id }) => _id !== id);
    onRemovedTransactions(updatedTransactions);
  };
  const handleEditTransactions = () => onEditedTransactions();

  return (
    <div>
      {transactions.map((transaction, index) => {
        return (
          <Transaction
            transaction={transaction}
            key={index}
            onEditTransactions={handleEditTransactions}
            onRemoveTransactions={handleRemoveTransactions}
          />
        );
      })}
    </div>
  );
}
