import axios from 'axios';
import { API_URL } from '@/constants/api';
import * as SecureStore from 'expo-secure-store';

export const donations = async () => {
  try {
    const token = await SecureStore.getItemAsync('token');
    if (!token) {
      throw new Error('No token found');
    }

    // Fetch the data from the backend
    const response = await axios.get(`${API_URL}/api/CampaignApi`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Ensure response is parsed as JSON (Axios typically does this automatically)
    return typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch user data');
    } else if (error.request) {
      throw new Error('No response from the server');
    } else {
      throw new Error(error.message);
    }
  }
};
