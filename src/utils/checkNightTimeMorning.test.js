import { checkNightTimeMorning } from './checkNightTimeMorning';

describe('checkNightTimeMorning', () => {
  const nightEnd = 6;
  it('should return true if time is before nightEnd', () => {
    const time = '2018-05-05T05:00:00';
    expect(checkNightTimeMorning(time, nightEnd)).toBe(true);
  });

  it('should return false if time is after nightEnd', () => {
    const time = '2018-05-05T07:00:00';
    expect(checkNightTimeMorning(time, nightEnd)).toBe(false);
  });
});
