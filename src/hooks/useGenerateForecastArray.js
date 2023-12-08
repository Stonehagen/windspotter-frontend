import moment from 'moment';
import { checkNightTimeMorning } from '../utils/checkNightTimeMorning';

export const useGenerateForecastArray = (forecast, nightEnd) => {
  const getWindDirection = (v, u) => {
    return (270 - Math.atan2(v, u) * (180 / Math.PI)) % 360;
  };
  
  const getWindSpeed = (v, u) => {
    return Math.sqrt(Math.pow(u, 2) + Math.pow(v, 2));
  };
  
  const getTemperature = (t) => {
    return t - 273.15;
  };

  const newForecastArray = [];
  // check if all forecast values are available
  if (
    !forecast.t_2m ||
    !forecast.v_10m ||
    !forecast.u_10m ||
    !forecast.vmax_10m ||
    !forecast.clct_mod ||
    !forecast.rain_gsp
  ) {
    return newForecastArray;
  }

  // get current date
  const today = new Date().setHours(0, 0, 0, 0);

  // sort forecast by date
  // v_10m: Wind at 10m above ground is leading value
  const sortedDates = Object.keys(forecast.v_10m).sort((a, b) => {
    return new Date(a) - new Date(b);
  });

  // get last day of forecast
  const lastTimestamp = new Date(sortedDates[sortedDates.length - 1]);
  const lastDay = +moment(lastTimestamp).format('DD');

  // check if last forecast value is from the night in morning
  const skipLastDay = checkNightTimeMorning(lastTimestamp, nightEnd);

  for (const time of sortedDates) {
    const forecastTimestamp = new Date(time);
    const timestampDay = +moment(forecastTimestamp).format('DD');
    const skipThisDay = skipLastDay && timestampDay === lastDay;

    // only add forecast values for today and the future
    if (forecastTimestamp.getTime() >= today && !skipThisDay) {
      // if forecast value is not available, use last available value or 0
      const lastForecast = newForecastArray[newForecastArray.length - 1]
        ? newForecastArray[newForecastArray.length - 1]
        : {
            t: 0,
            dir: 0,
            ws: 0,
            wsMax: 0,
            clouds: 0,
            rain: 0,
            waveDir: 0,
            waveHeight: 0,
            wavePeriod: 0,
          };

      // add forecast values to array
      newForecastArray.push({
        time: forecastTimestamp,
        hour: +moment(forecastTimestamp).format('HH'),
        day: +moment(forecastTimestamp).format('DD'),
        t: forecast.t_2m[time]
          ? getTemperature(forecast.t_2m[time])
          : lastForecast.t,
        dir: getWindDirection(forecast.v_10m[time], forecast.u_10m[time]),
        ws: getWindSpeed(forecast.v_10m[time], forecast.u_10m[time]),
        wsMax: forecast.vmax_10m[time]
          ? forecast.vmax_10m[time]
          : getWindSpeed(forecast.v_10m[time], forecast.u_10m[time]),
        clouds: forecast.clct_mod[time] ? forecast.clct_mod[time] : 0,
        rain: forecast.rain_gsp[time] ? forecast.rain_gsp[time] : 0,
        waveDir: forecast.mwd[time] ? forecast.mwd[time] : 0,
        waveHeight: forecast.swh[time] ? forecast.swh[time] : 0,
        wavePeriod: forecast.tm10[time] ? forecast.tm10[time] : 0,
      });
    }
  }
  return newForecastArray;
};
