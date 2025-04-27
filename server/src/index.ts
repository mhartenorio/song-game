import express from 'express';
import cors from 'cors';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { getRandomYear, getRandomPosition } from './utils/utils';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/song', async (req, res) => {
  try {
    const year = getRandomYear();
    console.log('Selected year:', year);
    
    const url = `https://en.wikipedia.org/wiki/Billboard_Year-End_Hot_100_singles_of_${year}`;
    console.log('Fetching URL:', url);
    
    const response = await axios.get(url);
    
    const $ = cheerio.load(response.data);
    const table = $(".wikitable").first();
    
    if (!table.length) {
      return res.status(404).json({ error: `No data found for year ${year}` });
    }
    
    const rows = table.find("tr").slice(1); // Skip header row
    console.log('Number of rows:', rows.length);
    const position = getRandomPosition(); // Convert to 0-based index
    const randomRow = rows[position];
    if (!randomRow) {
      return res.status(404).json({ error: 'No song found at selected position' });
    }
    
    const song = $(randomRow).find("td").eq(1).text().trim();
    const artist = $(randomRow).find("td").eq(2).text().trim();
    // return res.json({ song, artist, year });
    return res.send($.html(randomRow))
    
    // res.json({ song, artist, year });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch song data' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 