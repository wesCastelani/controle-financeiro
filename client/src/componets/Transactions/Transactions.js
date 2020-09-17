import React from 'react';

import css from './transactions.module.css';
import Action from './Action';
import Period from '../Inputs/Period';

export default function Transactions(props) {
  const { transactions, onDelete, selectTransaction } = props;

  const handleActionClick = (id, type) => {
    const transaction = transactions.find(
      (transaction) => transaction.id === id
    );
    if (type === 'delete') {
      onDelete(transaction);
      return;
    }
    selectTransaction(transaction);
  };

  return (
    <div>
      {transactions.map((transaction) => {
        var bgColor;
        if (transaction.type === '-') {
          bgColor = styles.red;
        } else {
          bgColor = styles.green;
        }
        return (
          <div key={transaction.id} className={css.cardT} style={bgColor}>
            <span className={css.text}>{transaction.day}</span>
            <div className={css.content}>
              <div className={css.trans}>
                <span>{transaction.category}</span>
                <span>{transaction.description}</span>
              </div>
              <span style={{ textAlign: 'right' }}>R$ {transaction.value}</span>
              <div>
                <Action
                  id={transaction.id}
                  type="edit"
                  onClick={handleActionClick}
                ></Action>
                <Action
                  id={transaction.id}
                  type="delete"
                  onClick={handleActionClick}
                ></Action>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  green: {
    backgroundColor: 'rgb(161, 240, 220)',
  },
  red: {
    backgroundColor: 'rgb(240, 161, 168)',
  },
};
