import React from 'react';
import moment from 'moment';
import { checkNightTime } from '../../utils/checkNightTime';
import { getWindSpeed } from '../../utils/getWindSpeed';

import WindForecastCol from './WindForecastCol';
import WeatherForecastCol from './WeatherForecastCol';
import WaveForecastCol from './WaveForecastCol';
import WindMeter from './WindMeter';

import Kite from '../../assets/icons/Kite.svg?react';

const ForecastTableRow = ({ timeframe, settings, updateSettings, mode, sunRise, sunSet }) => {
  const modelHour = moment(timeframe.modelTime).format('HH');
  const toggleNight = () => {
    updateSettings({ ...settings, displayNight: !settings.displayNight });
  };

  const nightStart = new Date(sunSet).getHours();
  const nightEnd = new Date(sunRise).getHours();

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
            nightStart,
            nightEnd
          ) &&
          !settings.displayNight &&
          'none',
      }}
    >
      <td className="time" onClick={toggleNight}>
        <div>{moment(timeframe.time).format('HH')}</div>
      </td>
      <td className="mainRow">
        <div className="upperRow" >
          <WindForecastCol
            timeframe={timeframe}
            settings={settings}
            updateSettings={updateSettings}
            nightStart={nightStart}
            nightEnd={nightEnd}
          />
          <WeatherForecastCol
            timeframe={timeframe}
            settings={settings}
            mode={mode}
            nightStart={nightStart}
            nightEnd={nightEnd}
          />
          <WaveForecastCol
            timeframe={timeframe}
            settings={settings}
            mode={mode}
            nightStart={nightStart}
            nightEnd={nightEnd}
          />
          <div
            className="kiteSize"
            style={{
              opacity:
                checkNightTime(
                  timeframe.time,
                  nightStart,
                  nightEnd,
                ) && '0.7',
            }}
          >
            <Kite />
            <div>
              {kiteSize > 18 || !kiteSize ? `-` : `${kiteSize}`}
              <span>{kiteSize > 18 ? '' : 'm'}</span>
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
