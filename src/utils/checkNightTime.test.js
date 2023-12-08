import { checkNightTime } from './checkNightTime';

describe('checkNightTime', () => {
  const timeNight = '2018-04-08T23:00:00';
  const timeDay = '2018-04-08T11:00:00';
  const nightStart = 22;
  const nightEnd = 6;

  it('should return true if time is night', () => {
    expect(checkNightTime(timeNight, nightStart, nightEnd)).toBe(true);
  });

  it('should return false if time is not night', () => {
    expect(checkNightTime(timeDay, nightStart, nightEnd)).toBe(false);
  });
});
