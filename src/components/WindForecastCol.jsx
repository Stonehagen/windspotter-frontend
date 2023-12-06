import getWindDirection from '../methods/getWindDirection';
import getWindSpeed from '../methods/getWindSpeed';
import { checkNighttime } from '../methods/checkNightTime';
import WindDir from '../assets/WindDir.svg?react';
import getColorGrade from '../methods/getColorGrade';

const WindForecastCol = ({ timeframe, settings, setSettings }) => {
  const changeWindUnit = () => {
    if (settings.windUnit === 'kts') {
      setSettings({ ...settings, windUnit: 'kph' });
    } else if (settings.windUnit === 'kph') {
      setSettings({ ...settings, windUnit: 'bft' });
    } else if (settings.windUnit === 'bft') {
      setSettings({ ...settings, windUnit: 'kts' });
    }
  };


  return (
    <div
      className="windForecast"
      style={{
        opacity:
          checkNighttime(
            timeframe.time,
            settings.nightStart,
            settings.nightEnd,
          ) && '0.7',
        background: `linear-gradient(to right, ${getColorGrade(
          timeframe.ws,
          'wind',
        )} 40%, ${getColorGrade(timeframe.wsMax, 'wind')} 80%)`,
      }}
    >
      <div className="windSpeeds">
        <div
          className="wind"
          style={{
            fontSize:
              getWindSpeed(timeframe.ws, settings.windUnit) > 99
                ? '2.3rem'
                : '3rem',
          }}
        >
          {getWindSpeed(timeframe.ws, settings.windUnit)}
        </div>
        <div className="windSecondCol">
          <div className="windGust">
            {getWindSpeed(timeframe.wsMax, settings.windUnit)}
          </div>
          <div className="windUnit" onClick={changeWindUnit}>
            {settings.windUnit}
          </div>
        </div>
      </div>
      <div className="windDirection">
        <WindDir style={{ transform: `rotate(${timeframe.dir + 180}deg)` }} />
        <div className="windDirInfo">
          <div className="windDirText">{getWindDirection(timeframe.dir)}</div>
          <div className="windDirNumber">{timeframe.dir.toFixed(0)}˚</div>
        </div>
      </div>
    </div>
  );
};

export default WindForecastCol;
