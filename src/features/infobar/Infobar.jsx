import React, { useState } from 'react';
import '../../assets/styles/Infobar.css';
import AddBookmark from '../../assets/icons/AddBookmark.svg?react';
import RemoveBookmark from '../../assets/icons/RemoveBookmark.svg?react';
import ForecastOverview from '../forecastOverview/ForecastOverview';
import axios from 'axios';

import WindDirection from '../windDirection/WindDirection';

const Infobar = ({
  spot,
  forecastArray,
  days,
  user,
  setUser,
}) => {
  const [bookmarked, setBookmarked] = useState(
    user ? (user.favorites ? user.favorites.includes(spot._id) : false) : false,
  );
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

  const addBookmark = () => {
    axios
      .post(`${import.meta.env.VITE_API_BACKENDSERVER}/user/addFavorite`, {
        spotId: spot._id,
      })
      .then((res) => {
        setBookmarked(res.data.user.favorites.includes(spot._id));
        setUser(
          res.data.user
            ? { ...user, favorites: res.data.user.favorites }
            : null,
        );
      })
      .catch((err) => console.log(err));
    // need a redirect to main page if an error occurs
  };
  //addFavorite

  return (
    <div className="infoBar">
      <div className="infoHeader">
        <div className="backBtn"></div>
        <div className="forecastInfo">
          <WindDirection windDirections={spot.windDirections} />
          <div className="forecastInfoText">
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
        </div>
        <div className="addBookmark">
          {user ? (
            bookmarked === true ? (
              <RemoveBookmark className="Icon" onClick={() => addBookmark()} />
            ) : (
              <AddBookmark className="Icon" onClick={() => addBookmark()} />
            )
          ) : (
            <></>
          )}
        </div>
      </div>
      <ForecastOverview forecast={forecastArray} days={days} />
    </div>
  );
};

export default Infobar;
