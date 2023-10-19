import moment from 'moment';
import WindDir from '../assets/WindDir.svg?react';
import ClearDay from '../assets/weather/ClearDay.svg?react';
import PartlyCloudyDay from '../assets/weather/PartlyCloudyDay.svg?react';
import MostlyCloudyDay from '../assets/weather/MostlyCloudyDay.svg?react';
import Cloudy from '../assets/weather/Cloudy.svg?react';
import getWindDirection from '../methods/getWindDirection';

import {
  getColorGradeWind,
  getColorGradeTemp,
  getColorGradeWave,
} from '../methods/getColorGrade';
import getWindSpeed from '../methods/getWindSpeed';

const OneDayTable = ({ dayArray, index }) => {
  const windUnit = 'kts';
  const getPrettyDate = (time) => {
    return moment(time).format('dddd, DD.MM.YY');
  };

  const getWeatherIcon = (cloudCover) => {
    if (cloudCover <= 0.25) {
      return <ClearDay />;
    } else if (cloudCover <= 0.5) {
      return <PartlyCloudyDay />;
    } else if (cloudCover <= 0.75) {
      return <MostlyCloudyDay />;
    } else {
      return <Cloudy />;
    }
  };

  const createTableRow = (timeframe) => {
    return (
      <tr key={moment(timeframe.time).format('HH')}>
        <td className="time">
          <div>{moment(timeframe.time).format('HH')}</div>
        </td>
        <td
          className="windForecast"
          style={{
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
                  getWindSpeed(timeframe.ws, windUnit) > 99 ? '2.3rem' : '3rem',
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
            {getWindDirection(timeframe.dir)}
          </div>
        </td>
        <td
          className="clouds"
          style={{ backgroundColor: getColorGradeTemp(timeframe.t) }}
        >
          {getWeatherIcon(timeframe.clouds)}
          <div className="temp">{timeframe.t.toFixed(0)}˚C</div>
        </td>
        <td
          className="waves"
          style={{
            backgroundColor: timeframe.waveHeight
              ? getColorGradeWave(timeframe.waveHeight)
              : 'transparent',
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
          ) : null}
        </td>
      </tr>
    );
  };

  return (
    <table className="ForecastTable" key={index}>
      <thead>
        <tr>
          <th colSpan={4}>{getPrettyDate(dayArray[0].time)}</th>
        </tr>
      </thead>
      <tbody>{dayArray.map((timeframe) => createTableRow(timeframe))}</tbody>
    </table>
  );
};

export default OneDayTable;
