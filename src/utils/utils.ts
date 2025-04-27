import seedrandom from 'seedrandom';

export const getDailySeed = (): number => {  
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const rng = seedrandom(today);
    return rng(); // Generate a random number
}
