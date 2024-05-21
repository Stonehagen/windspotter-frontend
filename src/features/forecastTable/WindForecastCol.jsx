import React, { useState, useEffect } from 'react';
import { getWindDirection } from '../../utils/getWindDirection';
import { getWindSpeed } from '../../utils/getWindSpeed';
import { checkNightTime } from '../../utils/checkNightTime';
import { getColorGrade } from '../../utils/getColorGrade';
import WindDir from '../../assets/icons/WindDir.svg?react';

const getWindowDimensions = () => {
  const { innerWidth: width } = window;
  return width;
};

const WindForecastCol = ({ timeframe, settings, updateSettings, nightStart, nightEnd }) => {
  const [windowWidth, setWindowWidth] = useState(getWindowDimensions());
  const changeWindUnit = () => {
    if (settings.windUnit === 'mps') {
      updateSettings({ ...settings, windUnit: 'kph' });
    } else if (settings.windUnit === 'kph') {
      updateSettings({ ...settings, windUnit: 'bft' });
    } else if (settings.windUnit === 'bft') {
      updateSettings({ ...settings, windUnit: 'kts' });
    } else if (settings.windUnit === 'kts') {
      updateSettings({ ...settings, windUnit: 'mps' });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(getWindowDimensions());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  return (
    <div
      className="windForecast"
      style={{
        opacity:
          checkNightTime(
            timeframe.time,
            nightStart,
            nightEnd,
          ) && '0.7',
        background: `${
          windowWidth >= 1000
            ? `linear-gradient(to top, ${getColorGrade(
                timeframe.ws,
                'wind',
              )} 70%, ${getColorGrade(timeframe.wsMax, 'wind')} 92%)`
            : `linear-gradient(to right, ${getColorGrade(
                timeframe.ws,
                'wind',
              )} 40%, ${getColorGrade(timeframe.wsMax, 'wind')} 80%)`
        }`,
      }}
    >
      <div className="windSpeeds" onClick={changeWindUnit}>
        <div
          className="wind"
          style={{
            scale:
              getWindSpeed(timeframe.ws, settings.windUnit) > 99 ? '0.7' : '1',
          }}
        >
          {getWindSpeed(timeframe.ws, settings.windUnit)}
        </div>
        <div className="windSecondCol">
          <div className="windGust">
            {getWindSpeed(timeframe.wsMax, settings.windUnit)}
            <span className="gustMaxDesktop">MAX</span>
          </div>
          <div className="windUnit">{settings.windUnit}</div>
        </div>
        <div className="windUnitDesktop">{settings.windUnit}</div>
      </div>
      <div className="windDirection">
        <WindDir
          className="windDir"
          style={{ transform: `rotate(${timeframe.dir + 180}deg)` }}
        />
        <div className="windDirInfo">
          <div className="windDirText">{getWindDirection(timeframe.dir)}</div>
          <div className="windDirNumber">{timeframe.dir? timeframe.dir.toFixed(0) : '-'}˚</div>
        </div>
      </div>
    </div>
  );
};

export default WindForecastCol;
