import React, { useState } from 'react';
import Modal from 'react-modal';
import './NewTransaction.css';
import TransactionService from '../../services/transactionsService';

Modal.setAppElement('#root');

export default function NewTransaction({ onNewTransaction }) {
  const initialTransactionState = {
    id: null,
    description: '',
    value: '',
    category: '',
    year: '',
    month: '',
    day: '',
    yearMonth: '',
    yearMonthDay: '',
    type: '',
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newTransaction, setNewTransaction] = useState({});

  const handleOpenClick = () => {
    const overlapingButtons = Array.from(
      document.getElementsByClassName('overlap')
    );
    overlapingButtons.forEach((button) => button.classList.add('behind'));
    setModalIsOpen(true);
  };

  const handleCloseClick = () => {
    setModalIsOpen(false);
    const overlapingButtons = Array.from(
      document.getElementsByClassName('overlap')
    );
    overlapingButtons.forEach((button) => button.classList.remove('behind'));
    setNewTransaction(initialTransactionState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setModalIsOpen(false);
    const overlapingButtons = Array.from(
      document.getElementsByClassName('overlap')
    );
    overlapingButtons.forEach((button) => button.classList.remove('behind'));
    saveTransaction();
    setNewTransaction(initialTransactionState);
  };

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const saveTransaction = async () => {
    const data = { ...newTransaction };
    const dateArray = data.yearMonthDay.split('-');
    data.year = dateArray[0];
    data.month = dateArray[1];
    data.day = dateArray[2];
    data.yearMonth = data.year + '-' + data.month;
    try {
      await TransactionService.add(data);
      onNewTransaction();
    } catch (error) {
      console.log(error);
    }
  };

  const { description, category, value, yearMonthDay } = newTransaction;
  return (
    <>
      <button
        onClick={handleOpenClick}
        className="waves-effect waves-light btn add-transaction-button overlap"
      >
        {'+ NOVO LANÇAMENTO'}
      </button>
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <div>
          <button
            style={{ position: 'absolute', right: 0, top: 0, margin: '8px' }}
            className="waves-effect waves-light btn red"
            onClick={handleCloseClick}
          >
            x
          </button>
          <h4 style={{ textAlign: 'center' }}>Inclusão de Lançamentos</h4>
        </div>
        <div className="row">
          <form className="col s12" onSubmit={handleSubmit}>
            <div
              style={{
                border: '1px solid lightgrey',
                padding: '10px',
                marginBottom: '10px',
              }}
            >
              <div
                className="row"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '20px',
                }}
                onChange={handleInputChange}
              >
                <label style={{ marginRight: '50px' }}>
                  <input
                    className="with-gap"
                    type="radio"
                    name="type"
                    value="-"
                    required
                  />
                  <span style={{ color: 'red', fontWeight: 'bold' }}>
                    Despesa
                  </span>
                </label>
                <label>
                  <input
                    className="with-gap"
                    type="radio"
                    name="type"
                    value="+"
                    required
                  />
                  <span style={{ color: 'green', fontWeight: 'bold' }}>
                    Receita
                  </span>
                </label>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    name="description"
                    type="text"
                    required
                    value={description}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="description">Descrição:</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    name="category"
                    type="text"
                    required
                    value={category}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="category">Categoria:</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s6">
                  <input
                    name="value"
                    type="number"
                    min="0.01"
                    step="0.01"
                    required
                    value={value}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="value">Valor:</label>
                </div>
                <div className="input-field col s6">
                  <input
                    type="date"
                    name="yearMonthDay"
                    value={yearMonthDay}
                    required
                    onChange={handleInputChange}
                  />
                  <label htmlFor="date">Data:</label>
                </div>
              </div>
            </div>
            <input
              type="submit"
              value="Salvar"
              className="waves-effect waves-light btn"
            />
          </form>
        </div>
      </Modal>
    </>
  );
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
