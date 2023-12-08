import { getWindDirection } from './getWindDirection';

describe('getWindDirection', () => {
  it('should return correct direction', () => {
    expect(getWindDirection(0)).toBe('N');
    expect(getWindDirection(22.5)).toBe('NNE');
    expect(getWindDirection(45)).toBe('NE');
    expect(getWindDirection(67.5)).toBe('ENE');
    expect(getWindDirection(90)).toBe('E');
    expect(getWindDirection(112.5)).toBe('ESE');
    expect(getWindDirection(135)).toBe('SE');
    expect(getWindDirection(157.5)).toBe('SSE');
    expect(getWindDirection(180)).toBe('S');
    expect(getWindDirection(202.5)).toBe('SSW');
    expect(getWindDirection(225)).toBe('SW');
    expect(getWindDirection(247.5)).toBe('WSW');
    expect(getWindDirection(270)).toBe('W');
    expect(getWindDirection(292.5)).toBe('WNW');
    expect(getWindDirection(315)).toBe('NW');
    expect(getWindDirection(337.5)).toBe('NNW');
    expect(getWindDirection(360)).toBe('N');
    expect(getWindDirection(382.5)).toBe('NNE');
  });
});
