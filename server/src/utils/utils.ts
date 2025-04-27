import seedrandom from 'seedrandom';

export const getDailySeed = (givenDate?: string): number => {
  const today = givenDate ?? new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const rng = seedrandom(today);
  return rng(); // Generate a random number
};

export const getRandomYear = (): string => {
  const years = Array.from({ length: 15 }, (_, i) => (2010 + i).toString());
  const seed = getDailySeed();
  return years[Math.floor(seed * years.length)];
};

export const getRandomPosition = (): number => {
  const positions = Array.from({ length: 100 }, (_, i) => i);
  const seed = getDailySeed();
  return positions[Math.floor(seed * positions.length)];
}; 