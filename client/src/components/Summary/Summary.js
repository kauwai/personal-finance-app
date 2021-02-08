import React from 'react';
import { applyCurrency } from '../../helpers/currencyFormater';

export default function Summary({ transactions }) {
  const revenues = transactions.filter(({ type }) => type === '+');
  const debts = transactions.filter(({ type }) => type === '-');
  const calculateTotalValue = (operations) => {
    return operations.reduce((acc, current) => acc + current.value, 0);
  };
  const totalRevenues = calculateTotalValue(revenues);
  const totalDebts = calculateTotalValue(debts);
  const totalBalance = totalRevenues - totalDebts;
  const balanceColor = totalBalance > 0 ? 'green' : 'red';
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        margin: '10px auto',
        padding: '5px 20px',
        width: '1000px',
        border: '1px solid lightgrey',
      }}
    >
      <p>{'Lançamentos: ' + transactions.length}</p>
      <p>
        {'Receitas: '}
        <span style={{ color: 'green' }}>{applyCurrency(totalRevenues)}</span>
      </p>
      <p>
        {'Despesas: '}
        <span style={{ color: 'red' }}>{applyCurrency(totalDebts)}</span>
      </p>
      <p>
        {'Saldo: '}
        <span style={{ color: balanceColor }}>
          {applyCurrency(totalBalance)}
        </span>
      </p>
    </div>
  );
}
