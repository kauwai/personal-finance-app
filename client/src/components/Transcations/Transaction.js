import React from 'react';
import './Transaction.css';
import { applyCurrency } from '../../helpers/currencyFormater';
import Edit from '../Edit/Edit';
import Delete from '../Delete/Delete';

export default function Transaction({
  transaction,
  onRemoveTransactions,
  onEditTransactions,
}) {
  const { description, value, category, day, type } = transaction;
  const color = type === '+' ? 'green' : 'red';
  const zeroPaddedDay = day ? 0 + day.toString() : null;
  const handleRemoveTransaction = (transaction) =>
    onRemoveTransactions(transaction);
  const handleEditTransaction = () => onEditTransactions();
  return (
    <div
      className="transaction-card"
      style={{ borderLeft: `5px solid ${color}` }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>{day > 9 ? day : zeroPaddedDay}</div>
        <div className="text-field">
          <div>{category}</div>
          <div>{description}</div>
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: '40px' }}>
          <div className="value-field">{applyCurrency(value)}</div>
        </div>
        <div>
          <Edit
            transaction={transaction}
            onEditTransaction={handleEditTransaction}
          />
          <Delete
            transaction={transaction}
            onRemoveTransaction={handleRemoveTransaction}
          />
        </div>
      </div>
    </div>
  );
}
