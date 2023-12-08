import chroma from 'chroma-js';

const maxMeterPerSecond = 33;
const minTemperature = -40;
const maxTemperature = 50;
const maxRain = 10;
const maxWave = 10;

const colorScaleWindDark = [
  '#05376A', //0
  '#2A517A', //4
  '#396697', //7
  '#30756E', //11
  '#4ECA2D', //17
  '#B9D227', //22
  '#D3A824', //28
  '#C25A2D', //34
  '#AA4646', //41
  '#903C5F', //48
  '#7B3575', //56
  '#491F99', //64
  '#273FC9', //83
  '#0000FF', //96
  '#B008CF', //114
  '#FE37FC', //135
];

const colorScaleWindLight = [
  '#FFFFFF', //0
  '#99BBDD', //4
  '#88AACC', //7
  '#44AAAA', //11
  '#4ECA2D', //17
  '#FFFF00', //22
  '#FFAA00', //28
  '#FF7715', //34
  '#EE3333', //41
  '#FF22AA', //48
  '#DB35FF', //56
  '#795FF9', //64
  '#0077FF', //83
  '#00CCFF', //96
  '#00FF99', //114
  '#FFFF00', //135
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

const colorScaleRain = ['#ffffff', '#3F93E2', '#304164'];

const colorScaleWave = ['#ffffff', '#3F93E2', '#304164'];

const getColorGradeWindDark = chroma
  .scale(colorScaleWindDark)
  .domain([
    0,
    4 * 0.514444,
    7 * 0.514444,
    11 * 0.514444,
    17 * 0.514444,
    22 * 0.514444,
    28 * 0.514444,
    34 * 0.514444,
    41 * 0.514444,
    48 * 0.514444,
    56 * 0.514444,
    64 * 0.514444,
    83 * 0.514444,
    96 * 0.514444,
    114 * 0.514444,
    135 * 0.514444,
    maxMeterPerSecond,
  ]);

const getColorGradeWindLight = chroma
  .scale(colorScaleWindLight)
  .domain([
    0,
    4 * 0.514444,
    7 * 0.514444,
    11 * 0.514444,
    17 * 0.514444,
    22 * 0.514444,
    28 * 0.514444,
    34 * 0.514444,
    41 * 0.514444,
    48 * 0.514444,
    56 * 0.514444,
    64 * 0.514444,
    83 * 0.514444,
    96 * 0.514444,
    114 * 0.514444,
    135 * 0.514444,
    maxMeterPerSecond,
  ]);

const getColorGradeTemp = chroma
  .scale(colorScaleTemp)
  .domain([minTemperature, maxTemperature]);

const getColorGradeRain = chroma.scale(colorScaleRain).domain([0, maxRain]);

const getColorGradeWave = chroma.scale(colorScaleWave).domain([0, maxWave]);

export const getColorGrade = (value, type) => {
  switch (type) {
    case 'wind':
      return getColorGradeWindLight(value);
    case 'windRGB':
      return chroma(getColorGradeWindDark(value)).rgb();
    case 'temp':
      return getColorGradeTemp(value);
    case 'rain':
      return getColorGradeRain(value);
    case 'wave':
      return getColorGradeWave(value);
    default:
      return getColorGradeWind(value);
  }
};
