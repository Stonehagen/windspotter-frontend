import chroma from 'chroma-js';

const maxMeterPerSecond = 33;
const minTemperature = -40;
const maxTemperature = 50;
const maxRain = 10;
const maxWave = 10;

const colorScaleWind = [
  '#10BFFF',
  '#36D7FC',
  '#6FF48F',
  '#73ED12',
  '#DADD12',
  '#EDC212',
  '#ED8F12',
  '#ED2912',
  '#D5102D',
  '#84445A',
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

const colorScaleRain = ['#ffffff', '#3F93E2','#304164'];

const colorScaleWave = ['#ffffff', '#3F93E2', '#304164'];

export const getColorGradeWind = chroma
  .scale(colorScaleWind)
  .domain([0, maxMeterPerSecond]);

export const getColorGradeTemp = chroma
  .scale(colorScaleTemp)
  .domain([minTemperature, maxTemperature]);

export const getColorGradeRain = chroma
  .scale(colorScaleRain)
  .domain([0, maxRain]);

export const getColorGradeWave = chroma
  .scale(colorScaleWave)
  .domain([0, maxWave]);
