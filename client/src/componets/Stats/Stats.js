import React, { useState, useEffect } from 'react';

import css from './stats.module.css';
export default function Stats(props) {
  const [revenue, setRevenue] = useState(0);
  const [expenses, setExpenses] = useState(0);

  const { transactions } = props;

  useEffect(() => {
    revenuesCalculator(transactions);
    exprensesCalculator(transactions);
  }, [transactions]);

  const revenuesCalculator = (transactions) => {
    let revenueFilter = transactions.filter((transaction) => {
      return transaction.type.includes('+');
    });
    const totalRevenue = revenueFilter.reduce((accumulator, current) => {
      return accumulator + current.value;
    }, 0);
    setRevenue(totalRevenue);
  };

  const exprensesCalculator = (transactions) => {
    let expensesFilter = transactions.filter((transaction) => {
      return transaction.type.includes('-');
    });
    const totalExpense = expensesFilter.reduce((accumulator, current) => {
      return accumulator + current.value;
    }, 0);
    setExpenses(totalExpense);
  };

  return (
    <div className={css.statsBar}>
      <span>Lançamentos: {transactions.length}</span>
      <span>Receitas: R$: {revenue}</span>
      <span>Despesas: R$: {expenses}</span>
      <span>Saldo: R$: {revenue - expenses}</span>
    </div>
  );
}
