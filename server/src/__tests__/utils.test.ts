import seedrandom from 'seedrandom';
import { getDailySeed } from '../utils/utils';

describe('Utils', () => {
  it('should return the same seed for the same day', () => {
    const seed1 = getDailySeed();
    const seed2 = getDailySeed();
    expect(seed1).toBe(seed2);
  });

  it('should return a different seed for different days', () => {
    const todaySeed = getDailySeed();

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().slice(0, 10).replace(/-/g, '');
    const yesterdayRng = seedrandom(yesterdayStr);
    const yesterdaySeed = yesterdayRng();

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().slice(0, 10).replace(/-/g, '');
    const tomorrowRng = seedrandom(tomorrowStr);
    const tomorrowSeed = tomorrowRng();

    // Verify that today's seed is different from yesterday and tomorrow
    expect(todaySeed).not.toBe(yesterdaySeed);
    expect(todaySeed).not.toBe(tomorrowSeed);
  });
}); 