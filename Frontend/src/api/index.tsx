import axios from 'axios';

const API_URL = 'https://aarug.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if user is logged in
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const login = (email: string, password: string) => 
  api.post('/auth/login', { email, password });

export const register = (name: string, email: string, password: string) => 
  api.post('/auth/register', { name, email, password });

// Product APIs
export const getProducts = () => 
  api.get('/products');

export const getProduct = (id: string) => 
  api.get(`/products/${id}`);

export const createProduct = (productData: FormData) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  return api.post('/products', productData, config);
};

// Added update product function
export const updateProduct = (id: string, productData: FormData) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  return api.put(`/products/${id}`, productData, config);
};

// Added delete product function
export const deleteProduct = (id: string) => 
  api.delete(`/products/${id}`);

// Cart & Order APIs
export const createOrder = (orderData: any) => 
  api.post('/orders', orderData);

export const getMyOrders = () => 
  api.get('/orders/myorders');

// Payment APIs
export const createPayment = (amount: number) => 
  api.post('/payments/create-order', { amount });

export const verifyPayment = (paymentData: any) => 
  api.post('/payments/verify', paymentData);
