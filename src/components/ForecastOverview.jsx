import React from 'react';
import moment from 'moment';
import { getColorGradeWind } from '../methods/getColorGrade';

const ForecastOverview = ({ forecast, getNighttimeMorning }) => {
  const checkIfNewDay = (prev, curr) => {
    return prev.getDay() !== curr.getDay();
  };

  const lastDay = +moment(forecast[forecast.length - 1].time).format('DD');
  const lastDaySkip = getNighttimeMorning(forecast[forecast.length - 1].time);

  const forecastData = forecast
    .map((timeframe) => {
      if (lastDaySkip && lastDay === +moment(timeframe.time).format('DD')) {
        return;
      }
      return {
        time: +moment(timeframe.time).format('HH'),
        day: +moment(timeframe.time).format('DD'),
        windSpeed: timeframe.ws,
        windSpeedMax: timeframe.wsMax,
      };
    })
    .filter((timeframe) => timeframe !== undefined);

  const highestWindSpeed = Math.max(
    ...forecastData.map((timeframe) => timeframe.windSpeedMax),
  );

  const days = [...new Set(forecastData.map((timeframe) => timeframe.day))];

  const scrolltoDay = (day) => {
    const dayElement = document.querySelector(
      `[dateday="${day}"][class="ForecastTable"]`,
    );
    dayElement.scrollIntoView({ behavior: 'auto', block: 'start' });
  };

  const createOverviewDay = (day) => {
    const dayData = forecastData.filter((timeframe) => timeframe.day === day);
    return (
      <>
        <div>{day}</div>
        <div className="OverviewChart">
          {dayData.map((timeframe, index) => {
            return (
              <div
                key={index}
                className="OverviewBar"
                style={{
                  height: `${
                    (timeframe.windSpeedMax / highestWindSpeed) * 100
                  }%`,
                }}
              >
                <div
                  className="OverviewBarWindMax"
                  style={{
                    height: `${
                      100 - (timeframe.windSpeed / timeframe.windSpeedMax) * 100
                    }%`,
                    background: `linear-gradient(to top, ${getColorGradeWind(
                      timeframe.windSpeed,
                    )} 0%, ${getColorGradeWind(
                      timeframe.windSpeedMax,
                    )} 40%,  ${getColorGradeWind(
                      timeframe.windSpeedMax,
                    )} 75%)`,
                  }}
                ></div>
                <div
                  className="OverviewBarWind"
                  style={{
                    height: `${
                      (timeframe.windSpeed / timeframe.windSpeedMax) * 100
                    }%`,
                    background: getColorGradeWind(timeframe.windSpeed),
                  }}
                ></div>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <>
      {forecast ? (
        <div className="ForecastOverview">
          {days.map((day) => {
            return (
              <div
                className="ForecastOverviewDay"
                key={day}
                dateday={day}
                onClick={() => scrolltoDay(day)}
              >
                {createOverviewDay(day)}
              </div>
            );
          })}
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default ForecastOverview;
