import seedrandom from 'seedrandom';

export const getDailySeed = (givenDate?: string): number => {
  const today = givenDate ?? new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const rng = seedrandom(today);
  return rng(); // Generate a random number
};

export const getRandomYear = (givenYear?: string): string => {
  const years = Array.from({ length: 15 }, (_, i) => (2010 + i).toString());
  const seed = getDailySeed();
  return givenYear ?? years[Math.floor(seed * years.length)];
};

export const getRandomPosition = (givenPosition?: number): number => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  const positions = Array.from({ length: 100 }, (_, i) => i);
  const seed = getDailySeed(yesterday.toISOString().slice(0, 10).replace(/-/g, ''));
  return givenPosition ?? positions[Math.floor(seed * positions.length)];
}; 