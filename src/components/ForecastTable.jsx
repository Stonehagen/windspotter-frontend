import React, { useState, useEffect } from 'react';
import '../styles/ForecastTable.css';

import OneDayTable from './OneDayTable';

const ForecastTable = ({ forecast }) => {
  const [forecastArray, setForecastArray] = useState([]);

  const generateForecastArray = (forecast) => {
    const newForecastArray = [];
    if (
      !forecast.t_2m ||
      !forecast.v_10m ||
      !forecast.u_10m ||
      !forecast.vmax_10m ||
      !forecast.clct_mod ||
      !forecast.prr_gsp
    ) {
      setForecastArray('error');
      return;
    }
    for (const [time, forecastValue] of Object.entries(forecast.t_2m)) {
      const forecastTimestamp = new Date(time);
      const today = new Date().setHours(0, 0, 0, 0);
      if (forecastTimestamp.getTime() >= today) {
        newForecastArray.push({
          time: forecastTimestamp,
          t: forecastValue - 273.15,
          dir:
            (270 -
              Math.atan2(forecast.v_10m[time], forecast.u_10m[time]) *
                (180 / Math.PI)) %
            360,
          ws: Math.sqrt(
            Math.pow(forecast.u_10m[time], 2) +
              Math.pow(forecast.v_10m[time], 2),
          ),
          wsMax: forecast.vmax_10m[time],
          clouds: forecast.clct_mod[time],
          rain: forecast.prr_gsp[time],
          waveDir: forecast.mwd[time] ? forecast.mwd[time] : 0,
          waveHeight: forecast.swh[time] ? forecast.swh[time] : 0,
          wavePeriod: forecast.tm10[time] ? forecast.tm10[time] : 0,
        });
      }
    }
    setForecastArray(newForecastArray);
  };

  const checkIfNewDay = (prev, curr) => {
    return prev.getDay() !== curr.getDay();
  };

  const createTables = (forecastArray) => {
    if ((forecastArray === 'error')) {
      return (
        <>
          <h3>No Forecast Available</h3>
        </>
      );
    }
    let dayStart = 0;
    return (
      <>
        {forecastArray.map((timeframe, index, arr) => {
          if (index === arr.length - 1) {
            const dayArray = arr.slice(dayStart, arr.length);
            return <OneDayTable dayArray={dayArray} index={index} />;
          } else if (checkIfNewDay(timeframe.time, arr[index + 1].time)) {
            const dayArray = arr.slice(dayStart, index + 1);
            dayStart = index + 1;
            return <OneDayTable dayArray={dayArray} index={index} />;
          }
        })}
      </>
    );
  };

  useEffect(() => {
    generateForecastArray(forecast);
  }, []);

  return <>{forecastArray ? createTables(forecastArray) : 'Loading'}</>;
};

export default ForecastTable;
