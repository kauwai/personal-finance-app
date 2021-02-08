import React from 'react';
import { periodOptions } from '../../helpers/periods';

export default function PeriodSelection({
  selectedDescription,
  onDescriptionChange,
}) {
  const handleChange = ({ target }) => {
    const { value } = target;
    onDescriptionChange(value);
  };

  const getDateIndex = () => {
    return periodOptions.findIndex(
      ({ description }) => description === selectedDescription
    );
  };
  const handleIncrease = () => {
    const index = getDateIndex();
    if (index + 1 < periodOptions.length) {
      const nextDate = periodOptions[index + 1].description;
      onDescriptionChange(nextDate);
    }
  };

  const handleDecrease = () => {
    const index = getDateIndex();
    if (index - 1 > -1) {
      const previousDate = periodOptions[index - 1].description;
      onDescriptionChange(previousDate);
    }
  };

  return (
    <div
      style={{ display: 'flex', margin: '5px 10px', justifyContent: 'center' }}
    >
      <button
        id="decrease-button"
        className="waves-effect waves-light btn overlap"
        onClick={handleDecrease}
      >
        <i className="material-icons">arrow_back</i>
      </button>
      <select
        style={{ maxWidth: '20%', margin: '0px 10px' }}
        className="browser-default"
        value={selectedDescription}
        onChange={handleChange}
      >
        {periodOptions.map(({ description }, index) => (
          <option key={index} value={description}>
            {description}
          </option>
        ))}
      </select>
      <button
        id="increase-button"
        className="waves-effect waves-light btn overlap"
        onClick={handleIncrease}
      >
        <i className="material-icons">arrow_forward</i>
      </button>
    </div>
  );
}
