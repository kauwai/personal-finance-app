import React from 'react';
import './Filter.css';

export default function Filter({ onFilterChange }) {
  const handleChange = ({ target }) => onFilterChange(target.value);
  return (
    <div className="input-field col s6 filter">
      <input onChange={handleChange} id="filter" type="text" />
      <label htmlFor="filter">Filtro</label>
    </div>
  );
}
