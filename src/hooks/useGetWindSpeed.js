export const useGetWindSpeed = (speedMS, unit) => {
  if (!speedMS) return '0';

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

  const speedKnots = speedMS * 1.9438444924574;
  const speedKPH = speedMS * 3.6;
  const speedMPH = speedMS * 2.2369362920544;
  const speedBft = beaufordConversionTable.reverse().find(
    (beauford) => speedMS >= beauford.speed,
  ).beauford;

  switch (unit) {
    case 'kts':
      return `${speedKnots.toFixed(0)}`;
    case 'kph':
      return `${speedKPH.toFixed(0)}`;
    case 'bft':
      return `${speedBft}`;
    case 'mph':
      return `${speedMPH.toFixed(0)}`;
    default:
      return `${speedMS.toFixed(0)}`;
  }
};