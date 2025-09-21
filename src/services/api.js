import axios from 'axios';
import toast from 'react-hot-toast';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request in development
    if (import.meta.env.DEV) {
      console.log('API Request:', config.method?.toUpperCase(), config.url, config.data);
    }
    
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Log response in development
    if (import.meta.env.DEV) {
      console.log('API Response:', response.status, response.config.url, response.data);
    }
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data);
    
    // Handle different error types
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('authToken');
          toast.error('Session expired. Please login again.');
          break;
        case 403:
          toast.error('Access denied. You don\'t have permission for this action.');
          break;
        case 404:
          toast.error('Resource not found.');
          break;
        case 422:
          // Validation errors
          if (data.errors) {
            Object.values(data.errors).forEach(error => {
              toast.error(error);
            });
          } else {
            toast.error(data.message || 'Validation failed');
          }
          break;
        case 500:
          toast.error('Server error. Please try again later.');
          break;
        default:
          toast.error(data.message || 'Something went wrong');
      }
    } else if (error.request) {
      // Network error
      toast.error('Network error. Please check your connection.');
    } else {
      // Other error
      toast.error('An unexpected error occurred.');
    }
    
    return Promise.reject(error);
  }
);

// Player API endpoints
export const playerAPI = {
  // Register a new player
  register: (data) => {
    // If data is FormData, we need to set the correct content type
    const config = {};
    if (data instanceof FormData) {
      config.headers = {
        'Content-Type': 'multipart/form-data',
      };
    }
    return api.post('/players', data, config);
  },
  
  // Get all players with pagination and filters
  getAll: (params = {}) => api.get('/players', { params }),
  
  // Get single player by ID
  getById: (id) => api.get(`/players/${id}`),
  
  // Update player
  update: (id, data) => api.put(`/players/${id}`, data),
  
  // Delete player
  delete: (id) => api.delete(`/players/${id}`),
  
  // Search players
  search: (query) => api.get('/players', { params: { search: query } }),
  
  // Get players by sport
  getBySport: (sport) => api.get('/players', { params: { sport } }),
  
  // Get players by disability type
  getByDisability: (disabilityType) => api.get('/players', { params: { disabilityType } }),
};

// ID Card API endpoints
export const idCardAPI = {
  // Generate ID card
  generate: (playerId) => api.post('/idcards/generate', { playerId }),
  
  // Get ID card
  get: (id) => api.get(`/idcards/${id}`),
  
  // Download ID card
  download: (playerId) => api.get(`/idcards/download/${playerId}`, {
    responseType: 'blob'
  }),
  
  // Send OTP for ID card access
  sendOTP: (email) => api.post('/idcards/send-otp', { email }),
  
  // Search player for ID card
  search: (playerId, email) => api.post('/idcards/search', { playerId, email }),
  
  // Verify OTP and get ID card
  verifyOTP: (email, otp) => api.post('/idcards/verify-otp', { email, otp }),
};

// User API endpoints
export const userAPI = {
  // Login
  login: (credentials) => api.post('/users/login', credentials),
  
  // Register
  register: (userData) => api.post('/users/register', userData),
  
  // Get current user
  getCurrent: () => api.get('/users/me'),
  
  // Update profile
  updateProfile: (data) => api.put('/users/profile', data),
  
  // Change password
  changePassword: (data) => api.put('/users/password', data),
  
  // Logout
  logout: () => api.post('/users/logout'),
};

// Health check
export const healthAPI = {
  check: () => api.get('/health'),
  test: () => api.get('/test'),
};

// Utility functions
export const apiUtils = {
  // Download file from blob
  downloadFile: (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  },
  
  // Format error message
  formatError: (error) => {
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    if (error.response?.data?.error) {
      return error.response.data.error;
    }
    return error.message || 'An error occurred';
  },
  
  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },
  
  // Get auth token
  getToken: () => {
    return localStorage.getItem('authToken');
  },
  
  // Set auth token
  setToken: (token) => {
    localStorage.setItem('authToken', token);
  },
  
  // Remove auth token
  removeToken: () => {
    localStorage.removeItem('authToken');
  },
};

export default api; 