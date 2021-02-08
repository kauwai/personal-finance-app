import React, { useEffect, useState } from 'react';
import Filter from '../components/Filter/Filter';
import NewTransaction from '../components/NewTranscation/NewTransaction';
import PeriodSelection from '../components/PeriodSelection/PeriodSelection';
import Summary from '../components/Summary/Summary';
import Transcations from '../components/Transcations/Transcations';
import { periodOptions, getCurrentDateObject } from '../helpers/periods';

export default function App() {
  const [selectedDescription, setSelectedDescription] = useState(
    getCurrentDateObject().description
  );
  const [selectedValue, setSelectedValue] = useState(
    getCurrentDateObject().value
  );
  const [transactions, setTransactions] = useState([{}]);
  const [filteredTransactions, setFilteredTransactions] = useState([{}]);

  const fetchTransactions = async () => {
    const fetchUrl = `https://kauwai-igti-desafio-final.herokuapp.com/api/transaction?period=${selectedValue}`;
    const res = await fetch(fetchUrl);
    const jsonResponse = await res.json();
    setTransactions(jsonResponse);
  };

  useEffect(() => {
    fetchTransactions();
  }, [selectedValue]);

  useEffect(() => setFilteredTransactions(transactions), [transactions]);

  const handleDescriptionChange = (description) => {
    setSelectedDescription(description);
    handleValueChange(description);
  };

  const handleValueChange = (description) => {
    const searchableValue = periodOptions.find(
      (period) => period.description === description
    ).value;
    setSelectedValue(searchableValue);
  };

  const handleFilterChange = (filter) => {
    const filtered = transactions.filter(({ description }) =>
      description.toLowerCase().includes(filter.toLowerCase())
    );
    console.log(filtered);
    setFilteredTransactions(filtered);
  };

  const handleRemovedTransactions = (updatedTransactions) => {
    setTransactions(updatedTransactions);
  };

  const handleNewTransaction = () => {
    fetchTransactions();
  };

  return (
    <>
      <h1 className="center">Bootcamp Full Stack - Desafio Final</h1>
      <h2 className="center">Controle Financeiro Pessoal</h2>
      <PeriodSelection
        selectedDescription={selectedDescription}
        onDescriptionChange={handleDescriptionChange}
      />
      <Summary transactions={filteredTransactions} />
      <Filter onFilterChange={handleFilterChange} />
      <NewTransaction onNewTransaction={handleNewTransaction} />
      <Transcations
        transactions={filteredTransactions}
        onRemovedTransactions={handleRemovedTransactions}
        onEditedTransactions={handleNewTransaction}
      />
    </>
  );
}
