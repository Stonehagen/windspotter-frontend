import { useGenerateForecastArray } from './useGenerateForecastArray';
import { forecast } from './__mocks__/forecast';

describe('useGenerateForecastArray', () => {
  const nightEnd = 6;
  const forecastArray = useGenerateForecastArray(forecast, nightEnd);
  it('should return an array', () => {
    expect(Array.isArray(forecastArray)).toBe(true);
  });
  it('should return an array with more than 0 items', () => {
    expect(forecastArray.length).toBeGreaterThan(0);
  });
});
