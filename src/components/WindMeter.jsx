import { useGetColorGrade } from '../hooks/useGetColorGrade';

const WindMeter = ({ timeframe }) => {
  const windMeterMax = timeframe.wsMax ? timeframe.wsMax : timeframe.ws;
  const windMeterBase = timeframe.wsMax ? timeframe.ws : undefined;

  return (
    <>
      <div
        className="windMaxMeter"
        style={{
          backgroundColor: useGetColorGrade(windMeterMax, 'wind'),
          width: `${Math.min((windMeterMax / 30) * 100, 100)}%`,
        }}
      >
        {windMeterBase ? (
          <div
            className="windMeter"
            style={{
              backgroundColor: useGetColorGrade(windMeterBase, 'wind'),
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
