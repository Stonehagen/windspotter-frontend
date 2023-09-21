import moment from 'moment';
import WindDir from '../assets/WindDir.svg?react';

import { getColorGradeWind, getColorGradeTemp } from '../methods/getColorGrade';
import getWindSpeed from '../methods/getWindSpeed';
import getWindDirection from '../methods/getWindDirection';

const OneDayTable = ({ dayArray, index }) => {
  const windUnit = 'kts';
  const getPrettyDate = (time) => {
    return moment(time).format('dddd, DD.MM.YY');
  };

  const createTableRow = (timeframe) => {
    return (
      <tr key={moment(timeframe.time - 2 * 6000).format('HH')}>
        <td className="time">
          <div>{moment(timeframe.time - 2 * 6000).format('HH')}</div>
        </td>
        <td
          style={{
            backgroundColor: getColorGradeWind(timeframe.ws),
          }}
        >
          <WindDir style={{ transform: `rotate(${timeframe.dir + 180}deg)` }} />
        </td>
        <td
          className="windSpeeds"
          style={{
            background: `linear-gradient(to right, ${getColorGradeWind(
              timeframe.ws,
            )}, ${getColorGradeWind(timeframe.wsMax)})`,
          }}
        >
          <div className="wind">{`${getWindSpeed(
            timeframe.ws,
            windUnit,
          )} ${windUnit}`}</div>
          <div className="windGust">
            max {`${getWindSpeed(timeframe.wsMax, windUnit)} ${windUnit}`}
          </div>
        </td>
        <td
          className="temp"
          style={{ backgroundColor: getColorGradeTemp(timeframe.t) }}
        >
          {timeframe.t.toFixed(0)}˚C
        </td>
        <td>{timeframe.clouds.toFixed(2)}</td>
        <td>{timeframe.rain.toFixed(2)}</td>
      </tr>
    );
  };

  return (
    <table className="ForecastTable" key={index}>
      <thead>
        <tr>
          <th colSpan={7}>{getPrettyDate(dayArray[0].time)}</th>
        </tr>
        <tr className="windHeading">
          <th>h</th>
          <th>dir</th>
          <th>wind</th>
          <th>temp</th>
          <th>cloud</th>
          <th>rain</th>
        </tr>
      </thead>
      <tbody>{dayArray.map((timeframe) => createTableRow(timeframe))}</tbody>
    </table>
  );
};

export default OneDayTable;
