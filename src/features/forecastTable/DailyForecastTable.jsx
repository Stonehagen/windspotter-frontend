import React from 'react';
import moment from 'moment';

import ForecastTableRow from './ForecastTableRow';

const DailyForecastTable = ({ dayArray, index, settings, setSettings }) => {
  const getPrettyDate = (time) => {
    return moment(time).format('dddd, DD.MM.YY');
  };

  return (
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
        {dayArray.map((timeframe, index) => (
          <ForecastTableRow
            timeframe={timeframe}
            settings={settings}
            setSettings={setSettings}
            key={index}
          />
        ))}
      </tbody>
    </table>
  );
};

export default DailyForecastTable;
