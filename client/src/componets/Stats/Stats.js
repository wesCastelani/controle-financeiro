import React from 'react';

import css from './stats.module.css';
export default function Stats(props) {
  const { transactions, revenue, expense } = props;

  return (
    <div className={css.statsBar}>
      <span>Lançamentos: {transactions.length}</span>
      <span>Receitas: R$: {revenue}</span>
      <span>Despesas: R$: {expense}</span>
      <span>Saldo: R$: {revenue - expense}</span>
    </div>
  );
}
