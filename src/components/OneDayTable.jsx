import moment from 'moment';
import WindDir from '../assets/WindDir.svg?react';
import ClearDay from '../assets/weather/ClearDay.svg?react';
import PartlyCloudyDay from '../assets/weather/PartlyCloudyDay.svg?react';
import MostlyCloudyDay from '../assets/weather/MostlyCloudyDay.svg?react';
import Cloudy from '../assets/weather/Cloudy.svg?react';
import Raindrop from '../assets/weather/Raindrop2.svg?react';

import { getColorGradeWind, getColorGradeTemp } from '../methods/getColorGrade';
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

  const getRaindrops = (rain) => {
    if (rain < 0.1) {
      return;
    }
    if (rain < 1) {
      return <Raindrop />;
    }
    if (rain < 3) {
      return (
        <>
          <Raindrop />
          <Raindrop />
        </>
      );
    }
    return (
      <>
        <Raindrop />
        <Raindrop />
        <Raindrop />
      </>
    );
  };

  const createTableRow = (timeframe) => {
    return (
      <tr key={moment(timeframe.time - 2 * 6000).format('HH')}>
        <td className="time">
          <div>{moment(timeframe.time - 2 * 6000).format('HH')}</div>
        </td>
        <td
          className="windForecast"
          style={{
            background: `linear-gradient(to right, ${getColorGradeWind(
              timeframe.ws,
            )} 40%, ${getColorGradeWind(timeframe.wsMax)} 80%)`,
          }}
        >
          <WindDir
            className="windDirection"
            style={{ transform: `rotate(${timeframe.dir + 180}deg)` }}
          />
          <div className="windSpeeds">
            <div className="wind">{`${getWindSpeed(
              timeframe.ws,
              windUnit,
            )} ${windUnit}`}</div>
            <div className="windGust">
              max {`${getWindSpeed(timeframe.wsMax, windUnit)} ${windUnit}`}
            </div>
          </div>
          <div className="clouds">
            {getWeatherIcon(timeframe.clouds)}
            <div className="raindrops">{getRaindrops(timeframe.rain)}</div>
          </div>
        </td>
        <td
          className="temp"
          style={{ backgroundColor: getColorGradeTemp(timeframe.t) }}
        >
          {timeframe.t.toFixed(0)}˚C
        </td>
      </tr>
    );
  };

  return (
    <table className="ForecastTable" key={index}>
      <thead>
        <tr>
          <th colSpan={7}>{getPrettyDate(dayArray[0].time)}</th>
        </tr>
      </thead>
      <tbody>{dayArray.map((timeframe) => createTableRow(timeframe))}</tbody>
    </table>
  );
};

export default OneDayTable;
