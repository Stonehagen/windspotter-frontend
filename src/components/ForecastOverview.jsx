import React from 'react';
import moment from 'moment';

const ForecastOverview = ({ forecast }) => {
  const checkIfNewDay = (prev, curr) => {
    return prev.getDay() !== curr.getDay();
  };

  const data = forecast.map((timeframe) => {
    return {
      time: +moment(timeframe.time).format('HH'),
      day: +moment(timeframe.time).format('DD'),
      windSpeed: timeframe.ws,
      windSpeedMax: timeframe.wsMax,
    };
  });

  return (
    <>
      {forecast ? (
        <div className="ForecastOverview">
          
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default ForecastOverview;
