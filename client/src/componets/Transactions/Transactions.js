import React from 'react';

import css from './transactions.module.css';
import Action from './Action';

export default function Transactions(props) {
  const { transactions, onDelete, onPersist } = props;

  const handleActionClick = (id, type) => {
    const transaction = transactions.find(
      (transaction) => transaction._id === id
    );
    if (type === 'delete') {
      onDelete(transaction);
      return;
    }
    onPersist(transaction);
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
          <div className={css.cardT} style={bgColor}>
            <span className={css.text}>{transaction.day}</span>
            <div className={css.content}>
              <div className={css.trans}>
                <span>{transaction.category}</span>
                <span>{transaction.description}</span>
              </div>
              <span style={{ textAlign: 'right' }}>R$ {transaction.value}</span>
              <div>
                <Action
                  id={transaction._id}
                  type="edit"
                  onClick={handleActionClick}
                ></Action>
                <Action
                  id={transaction._id}
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
