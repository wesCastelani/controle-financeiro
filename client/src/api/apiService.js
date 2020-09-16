import axios from 'axios';

const API_URL = 'http://localhost:3001/api/transaction';

async function getAllTransactions(period) {
  const res = await axios.get(`${API_URL}?period=${period}`);
  const data = res.data;
  return data;
}

async function insert(transaction) {
  const response = await axios.post(`${API_URL}/create`, transaction);
  return response.data.id;
}

async function deleteTransaction(transaction) {
  const response = await axios.delete(`${API_URL}/remove/${transaction.id}`);
  return response.data;
}

export { getAllTransactions, deleteTransaction, insert };
