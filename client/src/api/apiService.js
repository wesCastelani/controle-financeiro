import axios from 'axios';

//const API_URL = 'http://localhost:3001/api/transaction';

const api = axios.create({ baseURL: 'api' });
const API_URL = '/transaction';

async function getAllTransactions(period) {
  const res = await api.get(`${API_URL}?period=${period}`);
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
  const response = await api.post(`${API_URL}/create`, completeTransaction);
  return response.data.transaction;
}

async function update(transaction) {
  const { id } = transaction;
  const completeTransaction = getCompleteTransaction(transaction);
  const newTransaction = await api.put(
    `${API_URL}/update/${id}`,
    completeTransaction
  );
  return newTransaction.data.transaction;
}

async function deleteTransaction(transaction) {
  const response = await api.delete(`${API_URL}/remove/${transaction.id}`);
  return response.data;
}

export { getAllTransactions, deleteTransaction, insert, update };
