import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchProducts = async () => {
  try {
    const response = await apiClient.get('/api/products');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching products: ' + error.message);
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await apiClient.post('/api/products', productData);
    return response.data;
  } catch (error) {
    throw new Error('Error creating product: ' + error.message);
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    const response = await apiClient.put(`/api/products/${productId}`, productData);
    return response.data;
  } catch (error) {
    throw new Error('Error updating product: ' + error.message);
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await apiClient.delete(`/api/products/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error deleting product: ' + error.message);
  }
};