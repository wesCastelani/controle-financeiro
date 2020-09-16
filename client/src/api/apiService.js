import axios from 'axios';

const api = axios.create({ baseURL: 'api' });
const API_URL = '/transaction';

async function getAllTransactions(period) {
  const res = await api.get(`${API_URL}?period=${period}`);
  const data = res.data;
  return data;
}

async function insert(transaction) {
  const response = await api.post(`${API_URL}/create`, transaction);
  return response.data.id;
}

async function deleteTransaction(transaction) {
  const response = await api.delete(`${API_URL}/remove/${transaction.id}`);
  return response.data;
}

export { getAllTransactions, deleteTransaction, insert };
