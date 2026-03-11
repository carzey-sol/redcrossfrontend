import axios from 'axios';
import { API_URL } from '@/constants/api';

export const LoginApi = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/LoginApi/login`, {
      username: username,
      password: password,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      // Handle server errors
      throw new Error(error.response.data.message || 'Login failed');
    } else if (error.request) {
      // Handle no response from server
      throw new Error('No response from the server');
    } else {
      // Handle any other errors
      throw new Error(error.message);
    }
  }
};
