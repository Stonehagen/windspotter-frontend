import React, { useState, useEffect } from 'react';
import { checkNighttimeMorning } from '../methods/checkNightTime';
import '../styles/ForecastTable.css';

import OneDayTable from './OneDayTable';

const ForecastTable = ({
  forecast,
  settings,
}) => {
  const checkIfNewDay = (prev, curr) => {
    return prev.getDay() !== curr.getDay();
  };

  const createTables = (forecast) => {
    if (forecast === 'error') {
      return (
        <>
          <h3>No Forecast Available</h3>
        </>
      );
    }
    let dayStart = 0;
    return (
      <>
        {forecast.map((timeframe, index, arr) => {
          if (index === arr.length - 1) {
            // check if last element is at day and if so, create table
            if (!checkNighttimeMorning(timeframe.time, settings.nightEnd)) {
              const dayArray = arr.slice(dayStart, arr.length);
              return (
                <OneDayTable
                  dayArray={dayArray}
                  settings={settings}
                  key={index}
                />
              );
            }
          } else if (checkIfNewDay(timeframe.time, arr[index + 1].time)) {
            const dayArray = arr.slice(dayStart, index + 1);
            dayStart = index + 1;
            return (
              <OneDayTable
                dayArray={dayArray}
                settings={settings}
                key={index}
              />
            );
          }
        })}
      </>
    );
  };

  useEffect(() => {
    const targetSections = document.querySelectorAll('.ForecastTable');
    const menuItems = document.querySelectorAll('.ForecastOverviewDay');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0.1) {
            menuItems.forEach((item) => {
              if (
                item.getAttribute('dateday') ===
                entry.target.getAttribute('dateday')
              ) {
                item.classList.add('active');
              } else {
                item.classList.remove('active');
              }
            });
          }
        });
      },
      { threshold: 0.5 },
    );

    targetSections.forEach((section) => {
      observer.observe(section);
    });
  }, []);

  return <>{forecast ? createTables(forecast) : 'Loading'}</>;
};

export default ForecastTable;
