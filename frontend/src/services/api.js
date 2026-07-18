import axios from 'axios';

const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000/api'
  : '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const checkHealth = async () => {
  const response = await api.get('/health');
  return response.data;
};

export const predictLoan = async (formData) => {
  const isFormData = typeof FormData !== 'undefined' && formData instanceof FormData;
  const response = await api.post('/predict', formData, isFormData ? {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  } : undefined);
  return response.data;
};

export const getPredictionHistory = async (limit = 100) => {
  const response = await api.get(`/history?limit=${limit}`);
  return response.data;
};

export const sendMessageToChat = async (payload) => {
  const response = await api.post('/chat', payload);
  return response.data;
};

export const sendVoiceToChat = async (payload) => {
  const response = await api.post('/voice', payload);
  return response.data;
};

export const getFaqs = async () => {
  const response = await api.get('/faqs');
  return response.data;
};

export const getReport = async (payload) => {
  const queryStr = payload ? `?data=${encodeURIComponent(JSON.stringify(payload))}` : '';
  const response = await api.get(`/report${queryStr}`);
  return response.data;
};

export default api;
