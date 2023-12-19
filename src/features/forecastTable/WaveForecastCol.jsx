import WindDir from '../../assets/icons/WindDir.svg?react';
import { checkNightTime } from '../../utils/checkNightTime';
import { getColorGrade } from '../../utils/getColorGrade';

const WaveForecastCol = ({ timeframe, settings, mode }) => {
  return (
    <div
      className="waves"
      style={{
        opacity:
          checkNightTime(
            timeframe.time,
            settings.nightStart,
            settings.nightEnd,
          ) && '0.7',
        backgroundColor: timeframe.waveHeight
          ? getColorGrade(
              timeframe.waveHeight,
              `wave${mode == 'dark' ? 'D' : 'L'}`,
            )
          : mode == 'dark' ? '#333' : '#F9F9F9',
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
              className="waveDir"
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
