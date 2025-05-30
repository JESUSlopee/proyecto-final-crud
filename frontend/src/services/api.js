import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Asegúrate que coincide con tu puerto del backend
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptores para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return Promise.reject(error.response.data);
    } else if (error.request) {
      return Promise.reject({ message: 'No response from server' });
    } else {
      return Promise.reject({ message: error.message });
    }
  }
);

export default api;