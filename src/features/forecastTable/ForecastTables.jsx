import React, { useEffect } from 'react';
import '../../assets/styles/ForecastTable.css';

import DailyForecastTable from './DailyForecastTable';

const ForecastTables = ({ forecast, days, settings, setSettings, mode }) => {
  const createTables = (forecast) => {
    if (!forecast) {
      return (
        <>
          <h3>No Forecast Available</h3>
        </>
      );
    }

    const sortedForecastDays = days.map((day) => {
      return forecast.filter((timeframe) => timeframe.day === day);
    });

    return sortedForecastDays.map((dayArray, index) => {
      if (index > 13) return null;
      return (
        <DailyForecastTable
          dayArray={dayArray}
          settings={settings}
          setSettings={setSettings}
          key={index}
          mode={mode}
        />
      );
    });
  };

  useEffect(() => {
    const targetSections = document.querySelectorAll('.ForecastTable');
    const menuItems = document.querySelectorAll('.ForecastOverviewDay');
    const options = {
      root: document,
      rootMargin: '-10px 0px -40% 0px',
      threshold: 0.1,
    };

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
      options,
    );

    targetSections.forEach((section) => {
      observer.observe(section);
    });
  }, []);

  return <>{forecast ? createTables(forecast) : ''}</>;
};

export default ForecastTables;
