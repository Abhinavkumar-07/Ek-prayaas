import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Initiatives
export const getInitiatives = (params) => api.get('/initiatives', { params });
export const getInitiativeBySlug = (slug) => api.get(`/initiatives/${slug}`);

// Events
export const getEvents = (params) => api.get('/events', { params });
export const getEventBySlug = (slug) => api.get(`/events/${slug}`);

// Team
export const getTeam = () => api.get('/team');

// Gallery
export const getGallery = (params) => api.get('/gallery', { params });

// Contact
// Contact (FIXED)
export const submitContact = async (data) => {
  const res = await api.post('/contact', data);

  if (res.data && res.data.success === true) {
    return res.data;
  } else {
    throw new Error(res.data?.message || 'Contact submission failed');
  }
};


// Newsletter
export const subscribeNewsletter = (data) => api.post('/newsletter', data);

// Auth
export const login = (credentials) => api.post('/auth/login', credentials);

export default api;
