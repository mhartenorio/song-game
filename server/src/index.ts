import express from 'express';
import cors from 'cors';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { getRandomYear, getRandomPosition } from './utils/random';
import { getSongLink } from './utils/wiki';
import { getSongInfo } from './utils/wiki';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/song', async (req, res) => {
  try {
    const { songLink, year, position } = await getSongLink();
    if (!songLink) {
      return res.status(404).json({ error: 'No song link found' });
    }
    const data = await getSongInfo(songLink, year, position);

    return res.send(data)
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch song data' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 