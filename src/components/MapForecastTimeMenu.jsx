import React, { useState } from 'react';
import moment from 'moment';

const MapForecastTimeMenu = ({
  setForecastTime,
  forecastTime,
  forecastMap,
  setOverlayed,
  forecastModel,
}) => {
  const getDateString = (time) => {
    const date = new Date(time);
    const day = `${date.getDate()}`;
    const month = `${date.getMonth() + 1}`;
    const year = `${date.getFullYear()}`;
    return `${year.padStart(4, '0')}${month.padStart(2, '0')}${day.padStart(
      2,
      '0',
    )}`;
  };

  const [forecastDay, setForecastDay] = useState(
    getDateString(new Date(forecastTime)),
  );

  const getPrettyDate = (time) => {
    return moment(new Date(time)).format('dd, DD.MM');
  };

  const getForecastTimeMenu = () => {
    //group the forecastTimes by forecastDays and then forecastHours
    const forecastDays = {};
    for (const forecastTime in forecastMap.forecastMaps) {
      const dateIndex = getDateString(forecastTime);
      if (!forecastDays[dateIndex]) {
        forecastDays[dateIndex] = [];
      }
      forecastDays[dateIndex].push(forecastTime);
    }

    //sort the forecastDays
    const sortedForecastDays = Object.keys(forecastDays).sort((a, b) => a - b);

    //sort the forecastHours
    for (const day in forecastDays) {
      //sorting the timestamps by hour
      forecastDays[day].sort((a, b) => a - b);
    }

    //create the forecastDayMenu
    const forecastDayMenu = [];
    for (const sortedDay of sortedForecastDays) {
      const dayToday = getDateString(new Date());
      if (+sortedDay >= dayToday || +sortedDay + 3 <= dayToday) {
        forecastDayMenu.push(
          <div
            key={sortedDay}
            className="leaflet-control"
            onClick={() => {
              setForecastDay(sortedDay);
            }}
          >
            <div>{getPrettyDate(forecastDays[sortedDay][0])}</div>
          </div>,
        );
      }
    }

    // sort the forecastHours
    const sortedForecastHours = forecastDays[forecastDay].sort(
      (a, b) => new Date(a).getHours() - new Date(b).getHours(),
    );
    //sort the forecastHours
    for (const day in forecastDays) {
      //sorting the timestamps by hour
      forecastDays[day].sort((a, b) => a - b);
    }

    //create the forecastHourMenu
    const forecastHourMenu = [];

    for (const timestamp of sortedForecastHours) {
      const hours = new Date(timestamp).getHours();
      if (hours >= 7 && hours <= 21) {
        forecastHourMenu.push(
          <div
            key={timestamp}
            className="leaflet-control"
            onClick={() => {
              setForecastTime(timestamp);
              setOverlayed(false);
            }}
          >
            <div>{new Date(timestamp).getHours()}</div>
          </div>,
        );
      }
    }

    return (
      <>
        <div className="forecastHourMenu">{forecastHourMenu}</div>
        <div className="forecastDayMenu">{forecastDayMenu}</div>
      </>
    );
  };

  return (
    <div className="leaflet-bottom timeline-container">
      <div className="current-date">
        {`${forecastModel.toUpperCase()} - ${moment(
          new Date(forecastTime),
        ).format('dddd, DD.MM - HH:00')}`}
      </div>
      <div className="timeline">{getForecastTimeMenu()}</div>
    </div>
  );
};

export default MapForecastTimeMenu;
