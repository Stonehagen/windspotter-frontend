import React, { useState } from 'react';
import moment from 'moment';
import WindDir from '../assets/WindDir.svg?react';
import ClearDay from '../assets/weather/ClearDay.svg?react';
import PartlyCloudyDay from '../assets/weather/PartlyCloudyDay.svg?react';
import MostlyCloudyDay from '../assets/weather/MostlyCloudyDay.svg?react';
import CloudyNight from '../assets/weather/CloudyNight.svg?react';
import Cloudy from '../assets/weather/Cloudy.svg?react';
import RainDrop from '../assets/weather/RainDrop.svg?react';
import getWindDirection from '../methods/getWindDirection';

import {
  getColorGradeWind,
  getColorGradeTemp,
  getColorGradeWave,
  getColorGradeRain,
} from '../methods/getColorGrade';
import getWindSpeed from '../methods/getWindSpeed';

const OneDayTable = ({
  dayArray,
  index,
  windUnit,
  displayNight,
  getNighttime,
}) => {
  const getPrettyDate = (time) => {
    return moment(time).format('dddd, DD.MM.YY');
  };

  const getWeatherIcon = (cloudCover, night) => {
    if (cloudCover <= 0.25) {
      return night ? <CloudyNight /> : <ClearDay />;
    } else if (cloudCover <= 0.5) {
      return night ? <CloudyNight /> : <PartlyCloudyDay />;
    } else if (cloudCover <= 0.75) {
      return night ? <CloudyNight /> : <MostlyCloudyDay />;
    } else {
      return <Cloudy />;
    }
  };

  const getRainDrops = (rain) => {
    if (rain >= 4) {
      return (
        <>
          <RainDrop />
          <RainDrop />
          <RainDrop />
        </>
      );
    } else if (rain >= 2) {
      return (
        <>
          <RainDrop />
          <RainDrop />
        </>
      );
    } else if (rain >= 0.1) {
      return (
        <>
          <RainDrop />
        </>
      );
    }
    return <></>;
  };

  const createTableRow = (timeframe) => {
    return (
      <tr
        key={moment(timeframe.time).format('HH')}
        style={{
          display: getNighttime(timeframe.time) && !displayNight && 'none',
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
                opacity: getNighttime(timeframe.time) && '0.7',
                background: `linear-gradient(to right, ${getColorGradeWind(
                  timeframe.ws,
                )} 40%, ${getColorGradeWind(timeframe.wsMax)} 80%)`,
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
                  opacity: getNighttime(timeframe.time) && '0.7',
                  backgroundColor: getColorGradeTemp(timeframe.t),
                }}
              >
                {timeframe.t.toFixed(0)}˚<span>C</span>
              </div>
              <div
                className="clouds"
                style={{
                  backgroundColor:
                    timeframe.rain >= 0.1
                      ? getColorGradeRain(timeframe.rain)
                      : 'white',
                }}
              >
                {getWeatherIcon(timeframe.clouds, getNighttime(timeframe.time))}
                <div className="rain">
                  <div className="rainDrops">
                    {getRainDrops(timeframe.rain)}
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
                opacity: getNighttime(timeframe.time) && '0.7',
                backgroundColor: timeframe.waveHeight
                  ? getColorGradeWave(timeframe.waveHeight)
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
                  backgroundColor: getColorGradeWind(timeframe.wsMax),
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
                    backgroundColor: getColorGradeWind(timeframe.ws),
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
                  backgroundColor: getColorGradeWind(timeframe.ws),
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
    <table className="ForecastTable" key={index}>
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
