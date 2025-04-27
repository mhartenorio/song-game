import axios from 'axios';
import * as cheerio from 'cheerio';
import { getRandomYear, getRandomPosition } from './random';
import { Song } from '../types/song';

// Change values here to get specific songs, otherwise leave as undefined
const YEAR = undefined;
const POSITION = undefined;

function capitalizeWords(str: string) {
  return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export const getSongLink = async () => {
  const year = getRandomYear(YEAR);
  const url = `https://en.wikipedia.org/wiki/Billboard_Year-End_Hot_100_singles_of_${year}`;
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);
  const table = $(".wikitable").first();

  if (!table.length) {
    throw new Error(`No data found for year ${year}`);
  }

  const rows = table.find("tr").slice(1); // Skip header row
  const position = getRandomPosition(POSITION); // Convert to 0-based index
  const randomRow = rows[position];
  if (!randomRow) {
    throw new Error('No song found at selected position');
  }

  const song = $(randomRow).find("td").eq(1)
  const songLink = song.find("a").attr("href");

  return { songLink, year, position: position + 1 };
};

const parseTableRowInfo = (
  $: cheerio.CheerioAPI,
  infobox: cheerio.Cheerio<any>,
  searchTerms: string[],
  useHrefTag: boolean = false
) => {
  const row = infobox.find('tr').filter((_, el) => {
    const text = $(el).text().toLowerCase();
    return searchTerms.some(term => text.includes(term));
  });
  if (!row.length) return '';
  row.find('sup.reference').remove(); // Remove citation/reference tags

  let text = '';
  if (useHrefTag) {
    const links = row.find('a');
    const linkTitles = links.map((_, el) => $(el).text().trim()).get();
    if (linkTitles.length > 0) {
      text = linkTitles.join(', ');
    }
    return text;
  }

  // Check for ul list first
  const ul = row.find('ul');
  if (ul.length) {
    const items = ul.find('li').map((_, el) => $(el).text().trim()).get();
    text = items.join(', ');
  } else {
    text = row.text().trim().toLowerCase();
  }

  for (const term of searchTerms) {
    if (text.includes(term)) {
      text = text.split(term)[1].trim().replace(/\s+/g, ' ');
      break;
    }
  }

  if (text.startsWith('(s)')) {
    text = text.slice(3).trim();
  }

  return capitalizeWords(text);
};

const parseInfobox = (
  $: cheerio.CheerioAPI,
  infobox: cheerio.Cheerio<any>,
  year: string,
  chartPosition: number,
) => {
  const data: Song = {
    title: '',
    artist: '',
    releaseDate: '',
    genre: '',
    year,
    chartPosition,
  };

  // Get title
  const title = infobox.find('.infobox-above.summary').text().trim();
  if (title) data.title = title.replace(/^"|"$/g, ''); // Remove quotes

  // Get image
  const image = infobox.find('.infobox-image img').attr('src');
  if (image) data.image = image.startsWith('//') ? `https:${image}` : image;

  data.artist = parseTableRowInfo($, infobox, ['single by', 'song by']);
  data.album = parseTableRowInfo($, infobox, ['from the album', 'from the ep'], true);
  data.releaseDate = parseTableRowInfo($, infobox, ['released', 'release date']);
  data.genre = parseTableRowInfo($, infobox, ['genre']);
  data.length = parseTableRowInfo($, infobox, ['duration', 'length']);
  data.songwriters = parseTableRowInfo($, infobox, ['songwriter', 'songwriters', 'songwriter(s)', 'lyrics by', 'lyricist', 'lyricists', 'lyricist(s)', 'written by']);
  data.producers = parseTableRowInfo($, infobox, ['producer', 'producers', 'producer(s)']);
  data.label = parseTableRowInfo($, infobox, ['label', 'record label', 'record label(s)']);

  return data;
};

export const getSongInfo = async (songLink: string, year: string, position: number) => {
  if (!songLink) {
    throw new Error('No song link provided');
  }
  const response = await axios.get(`https://en.wikipedia.org${songLink}`);
  const $ = cheerio.load(response.data);
  const infobox = $(".infobox").first();
  return parseInfobox($, infobox, year, position);
};