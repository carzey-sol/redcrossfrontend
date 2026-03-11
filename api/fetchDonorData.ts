import axios from 'axios';
import { API_URL } from '@/constants/api';

export const fetchDonorData = async (id: string, setDonors: React.Dispatch<React.SetStateAction<any[]>>) => {
    try {
        const response: any = await axios.get(`${API_URL}/api/DonorApi/${id}`);
        console.log('response', response.data);

        if (response.data) {
            setDonors([response.data]);
        } else {
            console.error("Expected an array but got:", response.data);
            setDonors([]); // Set to empty array if not an array
        }
    } catch (error: any) {
        if (error.response) {
            console.error("Error response:", error.response);
            setDonors([]); // Set to empty array on error
        } else if (error.request) {
            console.error("No response from server:", error.request);
            setDonors([]); // Set to empty array on error
        } else {
            console.error("Request setup error:", error.message);
            setDonors([]); // Set to empty array on error
        }
    }
};
