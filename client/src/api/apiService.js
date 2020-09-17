import axios from 'axios';

//const API_URL = 'http://localhost:3001/api/transaction';

const axios = axios.create({ baseURL: 'api' });
const API_URL = '/transaction';

async function getAllTransactions(period) {
  const res = await axios.get(`${API_URL}?period=${period}`);
  const data = res.data;
  return data;
}

function getCompleteTransaction(transaction) {
  const { yearMonthDay } = transaction;
  const year = +yearMonthDay.substring(0, 4);
  const month = +yearMonthDay.substring(5, 7);
  const day = +yearMonthDay.substring(8, 10);

  const completeTransaction = {
    ...transaction,
    year,
    month,
    day,
  };
  return completeTransaction;
}

async function insert(transaction) {
  const completeTransaction = getCompleteTransaction(transaction);
  const response = await axios.post(`${API_URL}/create`, completeTransaction);
  return response.data.id;
}

async function update(transaction) {
  const { id } = transaction;
  const completeTransaction = getCompleteTransaction(transaction);
  const newTransaction = await axios.put(
    `${API_URL}/update/${id}`,
    completeTransaction
  );
  return newTransaction.data.transaction;
}

async function deleteTransaction(transaction) {
  const response = await axios.delete(`${API_URL}/remove/${transaction.id}`);
  return response.data;
}

export { getAllTransactions, deleteTransaction, insert, update };
