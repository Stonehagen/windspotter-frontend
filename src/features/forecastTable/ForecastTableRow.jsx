import React from 'react';
import moment from 'moment';
import { checkNightTime } from '../../utils/checkNightTime';

import WindForecastCol from './WindForecastCol';
import WeatherForecastCol from './WeatherForecastCol';
import WaveForecastCol from './WaveForecastCol';
import WindMeter from './WindMeter';

const ForecastTableRow = ({ timeframe, settings, setSettings }) => {
  const modelHour = moment(timeframe.modelTime).format('HH');
  const toggleNight = () => {
    setSettings({ ...settings, displayNight: !settings.displayNight });
  };

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
            setSettings={setSettings}
          />
          <WeatherForecastCol timeframe={timeframe} settings={settings} />
          <WaveForecastCol timeframe={timeframe} settings={settings} />
          <div className="modelInfo">
            <div>
              {timeframe.model.split(' ')[0]}
              <span>{timeframe.model.split(' ')[1]}</span>
            </div>
            <div>{+modelHour}<span>00</span></div>
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
