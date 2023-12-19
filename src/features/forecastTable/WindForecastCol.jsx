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

const WindForecastCol = ({ timeframe, settings, setSettings }) => {
  const [windowWidth, setWindowWidth] = useState(getWindowDimensions());
  const changeWindUnit = () => {
    if (settings.windUnit === 'mps') {
      setSettings({ ...settings, windUnit: 'kph' });
    } else if (settings.windUnit === 'kph') {
      setSettings({ ...settings, windUnit: 'bft' });
    } else if (settings.windUnit === 'bft') {
      setSettings({ ...settings, windUnit: 'kts' });
    } else if (settings.windUnit === 'kts') {
      setSettings({ ...settings, windUnit: 'mps' });
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
            settings.nightStart,
            settings.nightEnd,
          ) && '0.7',
        background: `${
          windowWidth >= 1000
            ? `linear-gradient(to top, ${getColorGrade(
                timeframe.ws,
                'wind',
              )} 60%, ${getColorGrade(timeframe.wsMax, 'wind')} 80%)`
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
          <div className="windDirNumber">{timeframe.dir.toFixed(0)}˚</div>
        </div>
      </div>
    </div>
  );
};

export default WindForecastCol;
