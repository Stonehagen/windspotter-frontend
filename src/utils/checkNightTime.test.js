import { checkNightTime } from './checkNightTime';

describe('checkNightTimeMorning', () => {
  const nightStart = 22;
  const nightEnd = 6;
  it('should return true if time is night', () => {
    const time = '2018-04-08T23:00:00';
    expect(checkNightTime(time, nightStart, nightEnd)).toBe(true);
  });

  it('should return false if time is not night', () => {
    const time = '2018-04-08T11:00:00';
    expect(checkNightTime(time, nightStart, nightEnd)).toBe(false);
  });
});
