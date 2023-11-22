import React, { useState } from 'react';
import moment from 'moment';

const MapForecastTimeMenu = ({
  setForecastTime,
  forecastTime,
  forecastMap,
  setOverlayed,
  forecastModel,
}) => {
  const [forecastDay, setForecastDay] = useState(
    new Date(forecastTime).getDate(),
  );

  const getPrettyDate = (time) => {
    return moment(new Date(time)).format('dd, DD.MM');
  };

  const getForecastTimeMenu = () => {
    //group the forecastTimes by forecastDays and then forecastHours
    const forecastDays = {};
    for (const forecastTime in forecastMap.forecastMaps) {
      const date = new Date(forecastTime);
      const day = date.getDate();
      const hour = date.getHours();
      if (!forecastDays[day]) {
        forecastDays[day] = [];
      }
      forecastDays[day].push(forecastTime);
    }

    //sort the forecastDays
    const sortedForecastDays = Object.keys(forecastDays).sort((a, b) => a - b);

    //sort the forecastHours
    for (const day in forecastDays) {
      //sorting the timestamps by hour
      forecastDays[day].sort((a, b) => {
        return new Date(a) - new Date(b);
      });
    }

    //create the forecastDayMenu
    const forecastDayMenu = [];
    for (const sortedDay of sortedForecastDays) {
      const dayToday = new Date().getDate();
      if (+sortedDay >= dayToday || +sortedDay + 3 <= dayToday) {
        forecastDayMenu.push(
          <div
            key={sortedDay}
            className="leaflet-control"
            onClick={() => {
              setForecastDay(sortedDay);
            }}
          >
            <div>
              {getPrettyDate(forecastDays[sortedDay][0])}
            </div>
          </div>,
        );
      }

    }
    //create the forecastHourMenu
    const forecastHourMenu = [];
    for (const timestamp of forecastDays[forecastDay]) {
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
