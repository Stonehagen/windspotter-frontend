import React  from 'react';
import moment from 'moment';

import ForecastTableRow from './ForecastTableRow';

const DailyForecastTable = ({ dayArray, index, settings, updateSettings, mode, sunRise, sunSet }) => {
  const getPrettyDate = (time) => {
    return moment(time).format('dddd, DD.MM.YY');
  };

  return (
    <>
      {dayArray ? (
        <table
          className="ForecastTable"
          key={index}
          dateday={+moment(dayArray[0].time).format('DD')}
        >
          <thead>
            <tr>
              <th colSpan={4} className="tableHeading">
                {getPrettyDate(dayArray[0].time)}
              </th>
            </tr>
          </thead>
          <tbody>
            {dayArray.filter((timeframe)=> {
              return timeframe.dir !== null;
            }).map((timeframe, index) => (

              <ForecastTableRow
                timeframe={timeframe}
                settings={settings}
                updateSettings={updateSettings}
                key={index}
                mode={mode}
                sunRise={sunRise}
                sunSet={sunSet}
              />
            ))}
          </tbody>
        </table>
      ) : null}
    </>
  );
};

export default DailyForecastTable;
