import React from 'react';
import moment from 'moment';
import { checkNightTime } from '../../utils/checkNightTime';
import { getWindSpeed } from '../../utils/getWindSpeed';

import WindForecastCol from './WindForecastCol';
import WeatherForecastCol from './WeatherForecastCol';
import WaveForecastCol from './WaveForecastCol';
import WindMeter from './WindMeter';

import Kite from '../../assets/icons/Kite.svg?react';

const ForecastTableRow = ({ timeframe, settings, updateSettings, mode }) => {
  const modelHour = moment(timeframe.modelTime).format('HH');
  const toggleNight = () => {
    updateSettings({ ...settings, displayNight: !settings.displayNight });
  };

  const kiteSize = Math.floor(
    (settings.weight / getWindSpeed(timeframe.ws, 'kts')) * 2.2,
  );

  return (
    <tr
      key={`${moment(timeframe.time).format('HH')}${
        moment(timeframe.time).isDST() ? 'DST' : ''
      }`}
      style={{
        display:
          checkNightTime(
            timeframe.time,
            settings.nightStart,
            settings.nightEnd,
          ) &&
          !settings.displayNight &&
          'none',
      }}
    >
      <td className="time" onClick={toggleNight}>
        <div>{moment(timeframe.time).format('HH')}</div>
      </td>
      <td className="mainRow">
        <div className="upperRow">
          <WindForecastCol
            timeframe={timeframe}
            settings={settings}
            updateSettings={updateSettings}
          />
          <WeatherForecastCol
            timeframe={timeframe}
            settings={settings}
            mode={mode}
          />
          <WaveForecastCol
            timeframe={timeframe}
            settings={settings}
            mode={mode}
          />
          <div
            className="kiteSize"
            style={{
              opacity:
                checkNightTime(
                  timeframe.time,
                  settings.nightStart,
                  settings.nightEnd,
                ) && '0.7',
            }}
          >
            <Kite />
            <div>
              {kiteSize > 17 || !kiteSize ? `-` : `${kiteSize}`}
              <span>{kiteSize > 17 ? '' : 'm'}</span>
            </div>
          </div>
          <div className="modelInfo">
            <div>
              {timeframe.model.split(' ')[0]}
              <span>{timeframe.model.split(' ')[1]}</span>
            </div>
            <div>
              {+modelHour}
              <span>00</span>
            </div>
          </div>
        </div>
        <div className="lowerRow">
          <WindMeter timeframe={timeframe} />
        </div>
      </td>
    </tr>
  );
};

export default ForecastTableRow;
