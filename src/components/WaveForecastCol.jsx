import WindDir from '../assets/WindDir.svg?react';
import { useCheckNightTime } from '../hooks/useCheckNightTime';
import getColorGrade from '../methods/getColorGrade';


const WaveForecastCol = ({ timeframe, settings }) => {
  return (
    <div
      className="waves"
      style={{
        opacity:
        useCheckNightTime(
            timeframe.time,
            settings.nightStart,
            settings.nightEnd,
          ) && '0.7',
        backgroundColor: timeframe.waveHeight
          ? getColorGrade(timeframe.waveHeight, 'wave')
          : 'white',
      }}
    >
      {timeframe.waveHeight ? (
        <>
          <div>
            {timeframe.waveHeight.toFixed(1)}
            <span className="wavesUnit">m</span>
          </div>
          <div className="wavesSecondCol">
            <div>
              {Math.round(timeframe.wavePeriod)}
              <span className="wavesPeriodUnit">s</span>
            </div>
            <WindDir
              style={{
                transform: `rotate(${timeframe.waveDir + 180}deg)`,
              }}
            />
          </div>
        </>
      ) : (
        <>-</>
      )}
    </div>
  );
};

export default WaveForecastCol;
