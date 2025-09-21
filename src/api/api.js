import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const registerPlayer = async (playerData) => {
  try {
    const response = await axios.post(`${API_URL}/players`, playerData);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.error || 
                        'Something went wrong';
    throw new Error(errorMessage);
  }
};