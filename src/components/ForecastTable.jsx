import React, { useState, useEffect } from 'react';
import moment from 'moment';
import '../styles/ForecastTable.css';

const ForecastTable = ({ spot }) => {
  //forecastInfo: { type: Schema.Types.ObjectId, ref: 'Forecast' },
  //time: { type: Date, required: true },
  //t: { type: Object },
  //v: { type: Object },
  //u: { type: Object },

  const getPrettyDate = (time) => {
    return moment(time).format('dddd, DD.MM.YY');
  };

  return (
    <table className="ForecastTable">
      <thead>
        <tr>
          <th colSpan={2}>{getPrettyDate(spot.forecasts[0].time)}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>02h</td>
          <td>3Kn</td>
          <td>Sun</td>
          <td>15</td>
        </tr>
        <tr>
          <td>02h</td>
          <td>3Kn</td>
          <td>Sun</td>
          <td>15</td>
        </tr>
        <tr>
          <td>02h</td>
          <td>3Kn</td>
          <td>Sun</td>
          <td>15</td>
        </tr>
      </tbody>
      <thead>
        <tr>
          <th colSpan={2}>{getPrettyDate(spot.forecasts[0].time)}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>02h</td>
          <td>3Kn</td>
          <td>Sun</td>
          <td>15</td>
        </tr>
        <tr>
          <td>02h</td>
          <td>3Kn</td>
          <td>Sun</td>
          <td>15</td>
        </tr>
        <tr>
          <td>02h</td>
          <td>3Kn</td>
          <td>Sun</td>
          <td>15</td>
        </tr>
      </tbody>
    </table>
  );
};

export default ForecastTable;
