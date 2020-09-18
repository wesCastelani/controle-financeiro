import React, { useState, useEffect } from 'react';

import * as api from './api/apiService';
import Transactions from './componets/Transactions/Transactions';
import Inputs from './componets/Inputs/Inputs';
import Stats from './componets/Stats/Stats';
import Period from './componets/Inputs/Period';
import ModalCtrl from './componets/Modal/ModalCtrl';

export default function App() {
  const [allTransactions, setAllTransactions] = useState([]);
  const [filter, setFilter] = useState();
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [period, setPeriod] = useState('2019-01');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState();

  useEffect(() => {
    const getTransactions = async () => {
      let transactions = await api.getAllTransactions(period);
      transactions = transactions.map((transaction) => {
        return {
          id: transaction._id,
          description: transaction.description,
          value: transaction.value,
          category: transaction.category,
          year: transaction.year,
          month: transaction.month,
          day: transaction.day,
          yearMonth: transaction.yearMonth,
          yearMonthDay: transaction.yearMonthDay,
          type: transaction.type,
          descriptionToLowerCase: transaction.description.toLowerCase(),
        };
      });
      setTimeout(() => {
        setAllTransactions(transactions);
        setFilteredTransactions(Object.assign([], transactions));
      }, 2000);
      return;
    };
    getTransactions();
  }, [period]);

  const handleDelete = async (transactionToDelete) => {
    const isDeleted = await api.deleteTransaction(transactionToDelete);
    if (isDeleted) {
      const index = filteredTransactions.findIndex(
        (transaction) => transaction.id === transactionToDelete.id
      );
      const newAllTransactions = Object.assign([], filteredTransactions);
      newAllTransactions.splice(index, 1);

      setFilteredTransactions(newAllTransactions);
    }
  };

  const handlePeriodChange = (period) => {
    setPeriod(period);
  };

  const handleChangeFilter = (newText) => {
    setFilter(newText);
    const filterLowerCase = newText.toLowerCase();
    const filteredTransactions = allTransactions.filter((transaction) => {
      return transaction.descriptionToLowerCase.includes(filterLowerCase);
    });
    setFilteredTransactions(filteredTransactions);
  };

  const handleClose = () => {
    setSelectedTransaction(null);
    setIsModalOpen(false);
  };

  const selectTransaction = (transaction) => {
    setIsModalOpen(true);
    setSelectedTransaction(transaction);
  };

  const onPersist = async (newTransaction, mode) => {
    if (mode === 'insert') {
      const postedTransaction = await api.insert(newTransaction);
      let newTransactions = [...filteredTransactions, postedTransaction];
      setFilteredTransactions(newTransactions);
      setSelectedTransaction(null);

      return;
    }
    if (mode === 'edit') {
      const updatedTransaction = await api.update(newTransaction);
      const newTransactions = [...filteredTransactions];
      const index = newTransactions.findIndex(
        (transaction) => transaction.id === newTransaction.id
      );

      newTransactions[index] = updatedTransaction;
      setFilteredTransactions(newTransactions);
    }
  };

  return (
    <div className="container">
      <h2 style={{ textAlign: 'center' }}>Controle de finanças pessoal</h2>
      <Period onChange={handlePeriodChange} value={period}></Period>
      <Stats transactions={filteredTransactions}></Stats>
      <Inputs
        onClick={selectTransaction}
        filter={filter}
        onChangeFilter={handleChangeFilter}
      ></Inputs>
      <Transactions
        onDelete={handleDelete}
        selectTransaction={selectTransaction}
        transactions={filteredTransactions}
      ></Transactions>
      {isModalOpen && (
        <ModalCtrl
          isOpen={isModalOpen}
          onClose={handleClose}
          onSave={onPersist}
          selectedTransaction={selectedTransaction}
        />
      )}
    </div>
  );
}
