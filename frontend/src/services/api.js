import axios from 'axios';

// Use relative path for Vercel Monorepo deployment
const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me'),
  verifyEmail: (token) => api.get(`/auth/verify/${token}`),
  forgotPassword: (data) => api.post('/auth/forgot-password', data),
  resetPassword: (token, data) => api.put(`/auth/reset-password/${token}`, data)
};

export const volunteersAPI = {
  register: (data) => api.post('/volunteers/register', data)
};

export const contactAPI = {
  send: (data) => api.post('/contact', data)
};

export const eventsAPI = {
  getAll: () => api.get('/events'),
  getById: (id) => api.get(`/events/${id}`),
  getUpcoming: () => api.get('/events?sort=date')
};

export const initiativesAPI = {
  getAll: () => api.get('/initiatives'),
  getFeatured: () => api.get('/initiatives?featured=true'),
  getById: (id) => api.get(`/initiatives/${id}`)
};

export const galleryAPI = {
  getAll: () => api.get('/gallery')
};

export const teamAPI = {
  getAll: () => api.get('/team')
};

export default api;