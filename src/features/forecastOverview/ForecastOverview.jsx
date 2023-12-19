import React from 'react';
import moment from 'moment';
import { getColorGrade } from '../../utils/getColorGrade';
import '../../assets/styles/ForecastOverview.css';

const ForecastOverview = ({ forecast, days }) => {
  const highestWindSpeed = Math.max(
    ...forecast.map((timeframe) => timeframe.wsMax),
  );

  const scrolltoDay = (day) => {
    const dayElement = document.querySelector(
      `[dateday="${day}"][class="ForecastTable"]`,
    );
    dayElement.scrollIntoView({ behavior: 'auto', block: 'center' });
  };

  const createOverviewDay = (day) => {
    const dayData = forecast.filter((timeframe) => timeframe.day === day);
    return (
      <>
        <div className="OverviewDayLabel">
          {moment(dayData[0].time).format('dd')}
        </div>
        <div className="OverviewChart">
          {dayData.map((timeframe, index) => {
            const heightWind = (timeframe.ws / timeframe.wsMax) * 100;
            const heightWindMax = 100 - heightWind;
            const heightOverviewBar =
              (timeframe.wsMax / highestWindSpeed) * 100;
            return (
              <div
                key={index}
                className="OverviewBar"
                style={{
                  height: `${heightOverviewBar}%`,
                }}
              >
                <div
                  className="OverviewBarWindMax"
                  style={{
                    height: `${heightWindMax}%`,
                    background: `linear-gradient(to top, ${getColorGrade(
                      timeframe.ws,
                      'wind',
                    )} 0%, ${getColorGrade(
                      timeframe.wsMax,
                      'wind',
                    )} 50%,  ${getColorGrade(timeframe.wsMax, 'wind')} 80%)`,
                  }}
                ></div>
                <div
                  className="OverviewBarWind"
                  style={{
                    height: `${heightWind}%`,
                    background: getColorGrade(timeframe.ws, 'wind'),
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
          {days.map((day, index) => {
            if (index > 13) return null;
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
