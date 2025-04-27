import axios from 'axios';

export const WikipediaAPI = {
  async getSong() {
    try {
      const response = await axios.get('http://localhost:3000/api/song');
      return response.data;
    } catch (error) {
      console.error('Error fetching song data:', error);
      throw error;
    }
  },
};
