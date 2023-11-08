const getWindDirection = (v, u) => {
  return (270 - Math.atan2(v, u) * (180 / Math.PI)) % 360;
};

const getWindSpeed = (v, u) => {
  return Math.sqrt(Math.pow(u, 2) + Math.pow(v, 2));
};

const getTemperature = (t) => {
  return t - 273.15;
};

export const generateForecastArray = (forecast) => {
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

  // sort forecast by date
  // v_10m: Wind at 10m above ground is leading value
  const sortedDates = Object.keys(forecast.v_10m).sort((a, b) => {
    return new Date(a) - new Date(b);
  });

  for (const time of sortedDates) {
    const forecastTimestamp = new Date(time);
    const today = new Date().setHours(0, 0, 0, 0);

    // only add forecast values for today and the future
    if (forecastTimestamp.getTime() >= today) {
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

      newForecastArray.push({
        time: forecastTimestamp,
        t: forecast.t_2m[time]
          ? getTemperature(forecast.t_2m[time])
          : lastForecast.t,
        dir: getWindDirection(forecast.v_10m[time], forecast.u_10m[time]),
        ws: getWindSpeed(forecast.v_10m[time], forecast.u_10m[time]),
        wsMax: forecast.vmax_10m[time] ? forecast.vmax_10m[time] : 0,
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
