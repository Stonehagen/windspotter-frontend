import { getColorGrade } from './getColorGrade';

describe('getColorGrade', () => {
  const value = 5;
  it('should return a color for wind', () => {
    const type = 'wind';
    expect(getColorGrade(value, type)).toBeTruthy();
  });
  it('should return diffent colors for wind', () => {
    const secondValue = 10;
    const type = 'wind';
    expect(getColorGrade(value, type)).not.toBe(
      getColorGrade(secondValue, type),
    );
  });
  it('should return a color for windRGB', () => {
    const type = 'windRGB';
    expect(getColorGrade(value, type)).toBeTruthy();
  });
  it('should return diffent colors for windRGB', () => {
    const secondValue = 10;
    const type = 'windRGB';
    expect(getColorGrade(value, type)).not.toBe(
      getColorGrade(secondValue, type),
    );
  });
  it('should return a color for temp', () => {
    const type = 'temp';
    expect(getColorGrade(value, type)).toBeTruthy();
  });
  it('should return diffent colors for temp', () => {
    const secondValue = 10;
    const type = 'temp';
    expect(getColorGrade(value, type)).not.toBe(
      getColorGrade(secondValue, type),
    );
  });
  it('should return a color for rain', () => {
    const type = 'rain';
    expect(getColorGrade(value, type)).toBeTruthy();
  });
  it('should return diffent colors for rain', () => {
    const secondValue = 10;
    const type = 'rain';
    expect(getColorGrade(value, type)).not.toBe(
      getColorGrade(secondValue, type),
    );
  });
  it('should return a color for wave', () => {
    const type = 'wave';
    expect(getColorGrade(value, type)).toBeTruthy();
  });
  it('should return diffent colors for wave', () => {
    const secondValue = 10;
    const type = 'wave';
    expect(getColorGrade(value, type)).not.toBe(
      getColorGrade(secondValue, type),
    );
  });
  it('should return false for unknown type', () => {
    const type = 'falseTest';
    expect(getColorGrade(value, type)).toBeFalsy();
  });
});
