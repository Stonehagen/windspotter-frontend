import React from 'react';
import moment from 'moment';
import { checkNighttime } from '../methods/checkNightTime';

import WindForecastCol from './WindForecastCol';
import WeatherForecastCol from './WeatherForecastCol';
import WaveForecastCol from './WaveForecastCol';
import WindMeter from './WindMeter';

const ForecastTableRow = ({ timeframe, settings, setSettings }) => {
  const displayNight = settings.displayNight;

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
          <WindForecastCol
            timeframe={timeframe}
            settings={settings}
            setSettings={setSettings}
          />
          <WeatherForecastCol timeframe={timeframe} settings={settings} />
          <WaveForecastCol timeframe={timeframe} settings={settings} />
        </div>
        <div className="lowerRow">
          <WindMeter timeframe={timeframe} />
        </div>
      </td>
    </tr>
  );
};

export default ForecastTableRow;
