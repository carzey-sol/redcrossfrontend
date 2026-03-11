import axios from 'axios';
import { API_URL } from '@/constants/api';
import * as SecureStore from 'expo-secure-store';

export const donationHistory = async (id) => {
    try {
        const token = await SecureStore.getItemAsync('token');
        console.log(`Token: ${token}`);
        if (!token) {
            throw new Error('No token found');
        }
        const url = `${API_URL}/api/DonationHistory/history?donorid=${id}`; // Pass id in the query

        console.log(`API URL: ${url}`);

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Failed to fetch donation history');
        } else if (error.request) {
            throw new Error('No response from the server');
        } else {
            throw new Error(error.message);
        }
    }
};
