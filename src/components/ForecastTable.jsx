import React, { useState, useEffect } from 'react';
import moment from 'moment';
import '../styles/ForecastTable.css';

const ForecastTable = ({ forecast }) => {
  const [forecastArray, setForecastArray] = useState([]);

  const addMinutesToDate = (date, minutes) => {
    return new Date(new Date(date).getTime() + minutes * 60000);
  };

  const generateForecastArray = (forecast) => {
    const newForecastArray = [];
    // ws = sqrt(u^2 + v^2).
    for (const [time, forecastValue] of Object.entries(forecast.t_2m)) {
      const angle =
        (270 -
          Math.atan2(forecast.u_10m[time], forecast.v_10m[time]) *
            (180 / Math.PI)) %
        360;
      newForecastArray.push({
        time: addMinutesToDate(forecast.time, time),
        t: forecastValue - 273.15,
        ws: Math.sqrt(
          Math.pow(forecast.u_10m[time], 2) + Math.pow(forecast.v_10m[time], 2),
        ),
        dir: angle,
      });
    }
    setForecastArray(newForecastArray);
  };

  const getPrettyDate = (time) => {
    return moment(time).format('dddd, DD.MM.YY');
  };

  const createTableRow = (timeframe) => {
    return (
      <tr key={moment(timeframe.time - 2 * 6000).format('HH')}>
        <td>{moment(timeframe.time - 2 * 6000).format('HH')}h</td>
        <td>{timeframe.ws.toFixed(0)} m/s</td>
        <td>{timeframe.dir.toFixed(0)}˚</td>
        <td>{timeframe.t.toFixed(0)}˚C</td>
      </tr>
    );
  };

  const createTableSegment = (dayArray, index) => {
    return (
      <React.Fragment key={index}>
        <thead>
          <tr>
            <th colSpan={4}>{getPrettyDate(dayArray[0].time)}</th>
          </tr>
        </thead>
        <tbody>{dayArray.map((timeframe) => createTableRow(timeframe))}</tbody>
      </React.Fragment>
    );
  };

  const checkIfNewDay = (prev, curr) => {
    return prev.getUTCDay() !== curr.getUTCDay();
  };

  const createTable = (forecastArray) => {
    let dayStart = 0;
    return (
      <table className="ForecastTable">
        {forecastArray.map((timeframe, index, arr) => {
          if (index === arr.length - 1) {
            const dayArray = arr.slice(dayStart, arr.length);
            return createTableSegment(dayArray, index);
          } else if (checkIfNewDay(timeframe.time, arr[index + 1].time)) {
            const dayArray = arr.slice(dayStart, index + 1);
            dayStart = index + 1;
            return createTableSegment(dayArray, index);
          }
        })}
      </table>
    );
  };

  useEffect(() => {
    generateForecastArray(forecast);
  }, []);

  return <>{forecastArray ? createTable(forecastArray) : 'Loading'}</>;
};

export default ForecastTable;
