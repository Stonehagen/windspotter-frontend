import React from 'react';
import moment from 'moment';
import { checkNighttime } from '../methods/checkNightTime';
import getColorGrade from '../methods/getColorGrade';

import WindForecastCol from './WindForecastCol';
import WeatherForecastCol from './WeatherForecastCol';
import WaveForecastCol from './WaveForecastCol';

const OneDayTable = ({ dayArray, index, settings }) => {
  const getPrettyDate = (time) => {
    return moment(time).format('dddd, DD.MM.YY');
  };
  const displayNight = settings.displayNight;

  const createTableRow = (timeframe) => {
    return (
      <tr
        key={`${moment(timeframe.time).format('HH')}${
          moment(timeframe.time).isDST() ? 'DST' : ''
        }`}
        style={{
          display:
            checkNighttime(
              timeframe.time,
              settings.nightStart,
              settings.nightEnd,
            ) &&
            !displayNight &&
            'none',
        }}
      >
        <td className="time">
          <div>{moment(timeframe.time).format('HH')}</div>
        </td>
        <td className="mainRow">
          <div className="upperRow">
            <WindForecastCol timeframe={timeframe} settings={settings} />
            <WeatherForecastCol timeframe={timeframe} settings={settings} />
            <WaveForecastCol timeframe={timeframe} settings={settings} />
          </div>
          <div className="lowerRow">
            {timeframe.wsMax ? (
              <div
                className="windMaxMeter"
                style={{
                  backgroundColor: getColorGrade(timeframe.wsMax, 'wind'),
                  width: `${
                    (timeframe.wsMax / 30) * 100 > 100
                      ? 100
                      : (timeframe.wsMax / 30) * 100
                  }%`,
                }}
              >
                <div
                  className="windMeter"
                  style={{
                    backgroundColor: getColorGrade(timeframe.ws, 'wind'),
                    width: `${
                      (timeframe.ws / timeframe.wsMax) * 100 > 100
                        ? 100
                        : (timeframe.ws / timeframe.wsMax) * 100
                    }%`,
                  }}
                ></div>
              </div>
            ) : (
              <div
                className="windMaxMeter"
                style={{
                  backgroundColor: getColorGrade(timeframe.ws, 'wind'),
                  width: `${
                    (timeframe.ws / 30) * 100 > 100
                      ? 100
                      : (timeframe.ws / 30) * 100
                  }%`,
                }}
              ></div>
            )}
          </div>
        </td>
      </tr>
    );
  };

  return (
    <table
      className="ForecastTable"
      key={index}
      dateday={+moment(dayArray[0].time).format('DD')}
    >
      <thead>
        <tr>
          <th colSpan={4} className="tableHeading">
            {getPrettyDate(dayArray[0].time)}
          </th>
        </tr>
      </thead>
      <tbody>{dayArray.map((timeframe) => createTableRow(timeframe))}</tbody>
    </table>
  );
};

export default OneDayTable;
