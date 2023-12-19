import React from 'react';
import '../../assets/styles/Infobar.css';
import AddBookmark from '../../assets/icons/AddBookmark.svg?react';
import RemoveBookmark from '../../assets/icons/RemoveBookmark.svg?react';
import ForecastOverview from '../forecastOverview/ForecastOverview';

const Infobar = ({ spot, forecastArray, days }) => {
  const bookmarked = false;
  const decimalToDMS = (decimal) => {
    const degrees = Math.trunc(decimal);
    const minutes = Math.trunc((decimal - degrees) * 60);
    const seconds = Math.trunc(((decimal - degrees) * 60 - minutes) * 60);
    return `${degrees}° ${minutes}' ${seconds}" `;
  };

  const getDirection = (decimal, latOrLon) => {
    if (latOrLon === 'lat') {
      return decimal > 0 ? 'N' : 'S';
    } else {
      return decimal > 0 ? 'E' : 'W';
    }
  };

  return (
    <div className="infoBar">
      <div className="infoHeader">
        <div className="backBtn">-</div>
        <div className="forecastInfo">
          <h3>{spot.name}</h3>
          <div className="spotInfos">
            <div>
              {decimalToDMS(spot.lat)}
              <span>{getDirection(spot.lat, 'lat')}</span>
            </div>
            <div>
              {decimalToDMS(spot.lon)}
              <span>{getDirection(spot.lon, 'lon')}</span>
            </div>
          </div>
        </div>
        <div className="addBookmark">
          {bookmarked === true ? (
            <RemoveBookmark className='Icon'/>
          ) : (
            <AddBookmark className='Icon' />
          )}
        </div>
      </div>
      <ForecastOverview forecast={forecastArray} days={days} />
    </div>
  );
};

export default Infobar;
