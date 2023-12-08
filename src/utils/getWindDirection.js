const directions = [
  'N',
  'NNE',
  'NE',
  'ENE',
  'E',
  'ESE',
  'SE',
  'SSE',
  'S',
  'SSW',
  'SW',
  'WSW',
  'W',
  'WNW',
  'NW',
  'NNW',
  'N',
];

export const getWindDirection = (deg) => {
  const degNormalized = deg > 360 ? deg % 360 : deg;
  const index = Math.round(degNormalized/ 22.5);
  const direction = directions[index];
  return direction;
};
