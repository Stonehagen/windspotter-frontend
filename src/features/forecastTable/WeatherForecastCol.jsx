import { checkNightTime } from '../../utils/checkNightTime';
import { getColorGrade } from '../../utils/getColorGrade';
import RainDrops from './RainDrops';
import WeatherIcon from './WeatherIcon';

const WeatherForecastCol = ({ timeframe, settings }) => {
  return (
    <div className="weather">
      <div
        className="temp"
        style={{
          opacity:
            checkNightTime(
              timeframe.time,
              settings.nightStart,
              settings.nightEnd,
            ) && '0.7',
          backgroundColor: getColorGrade(timeframe.t, 'temp'),
        }}
      >
        {timeframe.t.toFixed(0)}˚<span>C</span>
      </div>
      <div
        className="clouds"
        style={{
          backgroundColor:
            timeframe.rain >= 0.1
              ? getColorGrade(timeframe.rain, 'rain')
              : 'white',
        }}
      >
        <WeatherIcon
          cloudCover={timeframe.clouds}
          night={checkNightTime(
            timeframe.time,
            settings.nightStart,
            settings.nightEnd,
          )}
        />
        <div className="rain">
          <div className="rainDrops">
            <RainDrops rain={timeframe.rain} />
          </div>
          <div className="rainText">
            {timeframe.rain >= 0.1 ? (
              <>
                {timeframe.rain.toFixed(1)}
                <span>mm</span>
              </>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherForecastCol;