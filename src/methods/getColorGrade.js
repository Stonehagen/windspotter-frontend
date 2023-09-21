import chroma from 'chroma-js';

const maxMeterPerSecond = 33;
const minTemperature = -40;
const maxTemperature = 50;

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

const colorScaleTemp = [
  '#304164',
  '#3A74BF',
  '#3F93E2',
  '#71BEEB',
  '#DAE6F0',
  '#D3E3BD',
  '#8FCFB6',
  '#2997A1',
  '#7CAD2B',
  '#F2D411',
  '#ED9238',
  '#D64E44',
  '#AF3840',
  '#C6384F',
  '#84445A',
];


export const getColorGradeWind = chroma
  .scale(colorScaleWind)
  .domain([0, maxMeterPerSecond]);

export const getColorGradeTemp = chroma
  .scale(colorScaleTemp)
  .domain([minTemperature, maxTemperature]);

