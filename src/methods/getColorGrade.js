import chroma from 'chroma-js';

const maxMeterPerSecond = 33;

const colorScaleWind = [
  '#AEF1F9',
  '#96F7DC',
  '#96F7B4',
  '#6FF46F',
  '#73ED12',
  '#A4ED12',
  '#DAED12',
  '#EDC212',
  '#ED8F12',
  '#ED6312',
  '#ED2912',
  '#D5102D',
];

const getColorGrade = chroma
  .scale(colorScaleWind)
  .domain([0, maxMeterPerSecond]);

export default getColorGrade;
