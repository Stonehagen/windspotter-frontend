import React, { useState, useEffect } from 'react';
import '../styles/ForecastTable.css';

import OneDayTable from './OneDayTable';

const ForecastTable = ({ forecast, windUnit, displayNight, getNighttime }) => {
  const checkIfNewDay = (prev, curr) => {
    return prev.getDay() !== curr.getDay();
  };

  const createTables = (forecast) => {
    if (forecast === 'error') {
      return (
        <>
          <h3>No Forecast Available</h3>
        </>
      );
    }
    let dayStart = 0;
    return (
      <>
        {forecast.map((timeframe, index, arr) => {
          if (index === arr.length - 1) {
            const dayArray = arr.slice(dayStart, arr.length);
            return (
              <OneDayTable
                dayArray={dayArray}
                windUnit={windUnit}
                displayNight={displayNight}
                getNighttime={getNighttime}
                key={index}
              />
            );
          } else if (checkIfNewDay(timeframe.time, arr[index + 1].time)) {
            const dayArray = arr.slice(dayStart, index + 1);
            dayStart = index + 1;
            return (
              <OneDayTable
                dayArray={dayArray}
                windUnit={windUnit}
                displayNight={displayNight}
                getNighttime={getNighttime}
                key={index}
              />
            );
          }
        })}
      </>
    );
  };

  return <>{forecast ? createTables(forecast) : 'Loading'}</>;
};

export default ForecastTable;
