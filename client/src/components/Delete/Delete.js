import React from 'react';

export default function Delete({ transaction, onRemoveTransaction }) {
  const { _id } = transaction;
  const handleClick = () => {
    onRemoveTransaction(_id);
  };
  return (
    <i
      onClick={handleClick}
      className="material-icons pointer"
      style={{ marginLeft: '5px' }}
    >
      delete
    </i>
  );
}
