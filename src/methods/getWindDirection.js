export const directions = [
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

const getWindDirection = (deg) => {
  const index = Math.round(deg / 22.5);
  const direction = directions[index];
  return direction;
};

export default getWindDirection;
