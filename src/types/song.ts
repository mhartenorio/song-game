export type Song = {
  // Always available
  title: string;
  artist: string;
  releaseDate: string;
  genre: string;

  // Optional Fields - not always available
  album?: string;
  image?: string;
  length?: string;
  label?: string;
  recordedDate?: string;
  songwriters?: string;
  producers?: string;

  // From our seed
  year: string;
  chartPosition: number;
};
