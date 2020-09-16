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
  const [revenue, setRevenue] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [period, setPeriod] = useState('2019-01');
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          isDeleted: false,
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

  const revenuesCalculator = (filteredTransactions) => {
    let revenueFilter = filteredTransactions.filter((transaction) => {
      return transaction.type.includes('+');
    });
    const totalRevenue = revenueFilter.reduce((accumulator, current) => {
      return accumulator + current.value;
    }, 0);
    console.log(totalRevenue);
    return totalRevenue;
  };

  const exprensesCalculator = (filteredTransactions) => {
    let expensesFilter = filteredTransactions.filter((transaction) => {
      return transaction.type.includes('-');
    });
    const totalExpense = expensesFilter.reduce((accumulator, current) => {
      return accumulator + current.value;
    }, 0);
    return totalExpense;
  };

  const handleDelete = async (transactionToDelete) => {
    const isDeleted = await api.deleteTransaction(transactionToDelete);
    if (isDeleted) {
      const index = filteredTransactions.findIndex(
        (transaction) => transaction._id === transactionToDelete._id
      );
      const newAllTransactions = Object.assign([], filteredTransactions);
      newAllTransactions.splice(index, 1);

      const revenues = revenuesCalculator(newAllTransactions);
      const expenses = exprensesCalculator(newAllTransactions);
      setFilteredTransactions(newAllTransactions);
      setRevenue(revenues);
      setExpenses(expenses);
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
    const revenues = revenuesCalculator(filteredTransactions);
    const expenses = exprensesCalculator(filteredTransactions);
    setFilteredTransactions(filteredTransactions);
    setRevenue(revenues);
    setExpenses(expenses);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const onPersist = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="container">
      <h1>Desafio Final do Bootcamp Full Stack</h1>
      <Period onChange={handlePeriodChange} value={period}></Period>
      <Stats
        transactions={filteredTransactions}
        revenue={revenue}
        expense={expenses}
      ></Stats>
      <Inputs
        onClick={onPersist}
        filter={filter}
        onChangeFilter={handleChangeFilter}
      ></Inputs>
      <Transactions
        onDelete={handleDelete}
        onPersist={onPersist}
        transactions={filteredTransactions}
      ></Transactions>
      {isModalOpen && (
        <ModalCtrl onSave={onPersist} onClose={handleClose}></ModalCtrl>
      )}
    </div>
  );
}
