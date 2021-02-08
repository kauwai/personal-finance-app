import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import TransactionService from '../../services/transactionsService';

export default function Edit({ transaction, onEditTransaction }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editedTransaction, setEditedTransaction] = useState(transaction);

  useEffect(() => {
    setEditedTransaction(transaction);
  }, [transaction]);

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
    setEditedTransaction(transaction);
  };

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setEditedTransaction({ ...editedTransaction, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setModalIsOpen(false);
    const overlapingButtons = Array.from(
      document.getElementsByClassName('overlap')
    );
    overlapingButtons.forEach((button) => button.classList.remove('behind'));
    saveTransaction();
  };

  const saveTransaction = async () => {
    const data = { ...editedTransaction };
    const dateArray = data.yearMonthDay.split('-');
    data.year = dateArray[0];
    data.month = dateArray[1];
    data.day = dateArray[2];
    data.yearMonth = data.year + '-' + data.month;
    try {
      await TransactionService.update(data);
      onEditTransaction();
    } catch (error) {
      console.log(error);
    }
  };

  const {
    value,
    description,
    category,
    yearMonthDay,
    type,
  } = editedTransaction;

  return (
    <>
      <i onClick={handleOpenClick} className="material-icons pointer">
        edit
      </i>
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <div>
          <button
            style={{ position: 'absolute', right: 0, top: 0, margin: '8px' }}
            className="waves-effect waves-light btn red"
            onClick={handleCloseClick}
          >
            x
          </button>
          <h4 style={{ textAlign: 'center' }}>Edição de Lançamentos</h4>
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
              >
                <label style={{ marginRight: '50px' }}>
                  <input
                    className="with-gap"
                    type="radio"
                    name="type"
                    value="-"
                    disabled
                    checked={type === '-'}
                  />
                  <span style={{ fontWeight: 'bold' }}>Despesa</span>
                </label>
                <label>
                  <input
                    className="with-gap"
                    type="radio"
                    name="type"
                    value="+"
                    disabled
                    checked={type === '+'}
                  />
                  <span style={{ fontWeight: 'bold' }}>Receita</span>
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
                  <label className="active" htmlFor="description">
                    Descrição:
                  </label>
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
                  <label className="active" htmlFor="category">
                    Categoria:
                  </label>
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
                  <label className="active" htmlFor="value">
                    Valor:
                  </label>
                </div>
                <div className="input-field col s6">
                  <input
                    type="date"
                    name="yearMonthDay"
                    value={yearMonthDay}
                    required
                    onChange={handleInputChange}
                  />
                  <label className="active" htmlFor="date">
                    Data:
                  </label>
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
