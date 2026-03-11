import axios from 'axios';
import { API_URL } from '@/constants/api';

export const fetchBloodGroup = async (setBloodGroups: React.Dispatch<React.SetStateAction<any[]>>) => {
    try {
        const response: any = await axios.get(`${API_URL}/api/BloodTypeApi`);
        console.log('response', response.data);

        if (Array.isArray(response.data)) {
            setBloodGroups(response.data);
        } else {
            console.error("Expected an array but got:", response.data);
            setBloodGroups([]); // Set to empty array if not an array
        }
    } catch (error: any) {
        if (error.response) {
            console.error("Error response:", error.response);
            setBloodGroups([]); // Set to empty array on error
        } else if (error.request) {
            console.error("No response from server:", error.request);
            setBloodGroups([]); // Set to empty array on error
        } else {
            console.error("Request setup error:", error.message);
            setBloodGroups([]); // Set to empty array on error
        }
    }
};
