import React, { useState, useEffect } from 'react';
import { useGetWindDirection } from '../hooks/useGetWindDirection';
import { useGetWindSpeed } from '../hooks/useGetWindSpeed';
import { useCheckNightTime } from '../hooks/useCheckNightTime';
import WindDir from '../assets/WindDir.svg?react';
import { useGetColorGrade } from '../hooks/useGetColorGrade';

const getWindowDimensions = () => {
  const { innerWidth: width } = window;
  return width;
};

const WindForecastCol = ({ timeframe, settings, setSettings }) => {
  const [windowWidth, setWindowWidth] = useState(getWindowDimensions());
  const changeWindUnit = () => {
    if (settings.windUnit === 'kts') {
      setSettings({ ...settings, windUnit: 'kph' });
    } else if (settings.windUnit === 'kph') {
      setSettings({ ...settings, windUnit: 'bft' });
    } else if (settings.windUnit === 'bft') {
      setSettings({ ...settings, windUnit: 'kts' });
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
          useCheckNightTime(
            timeframe.time,
            settings.nightStart,
            settings.nightEnd,
          ) && '0.7',
        background: `${
          windowWidth >= 1000
            ? `linear-gradient(to top, ${useGetColorGrade(
                timeframe.ws,
                'wind',
              )} 40%, ${useGetColorGrade(timeframe.wsMax, 'wind')} 80%)`
            : `linear-gradient(to right, ${useGetColorGrade(
                timeframe.ws,
                'wind',
              )} 40%, ${useGetColorGrade(timeframe.wsMax, 'wind')} 80%)`
        }`,
      }}
    >
      <div className="windSpeeds" onClick={changeWindUnit}>
        <div
          className="wind"
          style={{
            fontSize:
              useGetWindSpeed(timeframe.ws, settings.windUnit) > 99
                ? '2.3rem'
                : '3rem',
          }}
        >
          {useGetWindSpeed(timeframe.ws, settings.windUnit)}
        </div>
        <div className="windSecondCol">
          <div className="windGust">
            {useGetWindSpeed(timeframe.wsMax, settings.windUnit)}
            <span className="gustMaxDesktop">MAX</span>
          </div>
          <div className="windUnit">{settings.windUnit}</div>
        </div>
        <div className="windUnitDesktop">{settings.windUnit}</div>
      </div>
      <div className="windDirection">
        <WindDir style={{ transform: `rotate(${timeframe.dir + 180}deg)` }} />
        <div className="windDirInfo">
          <div className="windDirText">
            {useGetWindDirection(timeframe.dir)}
          </div>
          <div className="windDirNumber">{timeframe.dir.toFixed(0)}˚</div>
        </div>
      </div>
    </div>
  );
};

export default WindForecastCol;
