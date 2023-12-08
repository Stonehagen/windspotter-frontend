import { getColorGrade } from '../utils/getColorGrade';

const WindMeter = ({ timeframe }) => {
  const windMeterMax = timeframe.wsMax ? timeframe.wsMax : timeframe.ws;
  const windMeterBase = timeframe.wsMax ? timeframe.ws : undefined;

  return (
    <>
      <div
        className="windMaxMeter"
        style={{
          backgroundColor: getColorGrade(windMeterMax, 'wind'),
          width: `${Math.min((windMeterMax / 30) * 100, 100)}%`,
        }}
      >
        {windMeterBase ? (
          <div
            className="windMeter"
            style={{
              backgroundColor: getColorGrade(windMeterBase, 'wind'),
              width: `${Math.min((windMeterBase / windMeterMax) * 100, 100)}%`,
            }}
          ></div>
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export default WindMeter;
