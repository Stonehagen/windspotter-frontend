import { getWindSpeed } from './getWindSpeed';

describe('getWindSpeed', () => {
  const beaufordConversionTable = [
    { beauford: 0, description: 'Calm', speed: 0 },
    { beauford: 1, description: 'Light air', speed: 0.3 },
    { beauford: 2, description: 'Light breeze', speed: 1.6 },
    { beauford: 3, description: 'Gentle breeze', speed: 3.4 },
    { beauford: 4, description: 'Moderate breeze', speed: 5.5 },
    { beauford: 5, description: 'Fresh breeze', speed: 8 },
    { beauford: 6, description: 'Strong breeze', speed: 10.8 },
    { beauford: 7, description: 'High wind', speed: 13.9 },
    { beauford: 8, description: 'Gale', speed: 17.2 },
    { beauford: 9, description: 'Strong gale', speed: 20.8 },
    { beauford: 10, description: 'Storm', speed: 24.5 },
    { beauford: 11, description: 'Violent storm', speed: 28.5 },
    { beauford: 12, description: 'Hurricane', speed: 32.7 },
  ];

  it('should return correct speed in knots', () => {
    const speedMS = 5;
    const unit = 'kts';
    const speedKnots = speedMS * 1.9438444924574;
    expect(getWindSpeed(speedMS, unit)).toBe(`${speedKnots.toFixed(0)}`);
  });
  it('should return correct speed in kph', () => {
    const speedMS = 5;
    const unit = 'kph';
    const speedKPH = speedMS * 3.6;
    expect(getWindSpeed(speedMS, unit)).toBe(`${speedKPH.toFixed(0)}`);
  });
  it('should return correct speed in bft', () => {
    const speedMS = 5;
    const unit = 'bft';
    const speedBft = beaufordConversionTable
      .reverse()
      .find((beauford) => speedMS >= beauford.speed).beauford;
    expect(getWindSpeed(speedMS, unit)).toBe(`${speedBft}`);
  });
});
