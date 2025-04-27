import axios from 'axios';
import * as cheerio from 'cheerio';
import { getRandomYear, getRandomPosition } from '../utils/utils';

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
