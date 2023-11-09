import React from 'react';
import moment from 'moment';
import { checkNighttime } from '../methods/checkNightTime';
import WindDir from '../assets/WindDir.svg?react';
import getWindDirection from '../methods/getWindDirection';
import getColorGrade from '../methods/getColorGrade';
import getWindSpeed from '../methods/getWindSpeed';

import RainDrops from './RainDrops';
import WeatherIcon from './WeatherIcon';

const OneDayTable = ({ dayArray, index, settings }) => {
  const getPrettyDate = (time) => {
    return moment(time).format('dddd, DD.MM.YY');
  };
  const windUnit = settings.windUnit;
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
            <div
              className="windForecast"
              style={{
                opacity:
                  checkNighttime(
                    timeframe.time,
                    settings.nightStart,
                    settings.nightEnd,
                  ) && '0.7',
                background: `linear-gradient(to right, ${getColorGrade(
                  timeframe.ws,
                  'wind',
                )} 40%, ${getColorGrade(timeframe.wsMax, 'wind')} 80%)`,
              }}
            >
              <div className="windSpeeds">
                <div
                  className="wind"
                  style={{
                    fontSize:
                      getWindSpeed(timeframe.ws, windUnit) > 99
                        ? '2.3rem'
                        : '3rem',
                  }}
                >
                  {getWindSpeed(timeframe.ws, windUnit)}
                </div>
                <div className="windSecondCol">
                  <div className="windGust">
                    {getWindSpeed(timeframe.wsMax, windUnit)}
                  </div>
                  <div className="windUnit">{windUnit}</div>
                </div>
              </div>
              <div className="windDirection">
                <WindDir
                  style={{ transform: `rotate(${timeframe.dir + 180}deg)` }}
                />
                <div className="windDirInfo">
                  <div className="windDirText">
                    {getWindDirection(timeframe.dir)}
                  </div>
                  <div className="windDirNumber">
                    {timeframe.dir.toFixed(0)}˚
                  </div>
                </div>
              </div>
            </div>
            <div className="weather">
              <div
                className="temp"
                style={{
                  opacity:
                    checkNighttime(
                      timeframe.time,
                      settings.nightStart,
                      settings.nightEnd,
                    ) && '0.7',
                  backgroundColor: getColorGrade(timeframe.t, 'temp'),
                }}
              >
                {timeframe.t.toFixed(0)}˚<span>C</span>
              </div>
              <div
                className="clouds"
                style={{
                  backgroundColor:
                    timeframe.rain >= 0.1
                      ? getColorGrade(timeframe.rain, 'rain')
                      : 'white',
                }}
              >
                <WeatherIcon
                  cloudCover={timeframe.clouds}
                  night={checkNighttime(
                    timeframe.time,
                    settings.nightStart,
                    settings.nightEnd,
                  )}
                />
                <div className="rain">
                  <div className="rainDrops">
                    <RainDrops rain={timeframe.rain} />
                  </div>
                  <div className="rainText">
                    {timeframe.rain >= 0.1 ? (
                      <>
                        {timeframe.rain.toFixed(1)}
                        <span>mm</span>
                      </>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="waves"
              style={{
                opacity:
                  checkNighttime(
                    timeframe.time,
                    settings.nightStart,
                    settings.nightEnd,
                  ) && '0.7',
                backgroundColor: timeframe.waveHeight
                  ? getColorGrade(timeframe.waveHeight, 'wave')
                  : 'white',
              }}
            >
              {timeframe.waveHeight ? (
                <>
                  <div>
                    {timeframe.waveHeight.toFixed(1)}
                    <span className="wavesUnit">m</span>
                  </div>
                  <div className="wavesSecondCol">
                    <div>
                      {Math.round(timeframe.wavePeriod)}
                      <span className="wavesPeriodUnit">s</span>
                    </div>
                    <WindDir
                      style={{
                        transform: `rotate(${timeframe.waveDir + 180}deg)`,
                      }}
                    />
                  </div>
                </>
              ) : (
                <>-</>
              )}
            </div>
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
