import { useState } from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/Infobar.css';
import AddBookmark from '../../assets/icons/AddBookmark.svg?react';
import RemoveBookmark from '../../assets/icons/RemoveBookmark.svg?react';
import Sunrise from '../../assets/icons/Sunrise.svg?react';
import Sunset from '../../assets/icons/Sunset.svg?react';
import ForecastOverview from '../forecastOverview/ForecastOverview';
import axios from 'axios';

import WindDirection from '../windDirection/WindDirection';

const Infobar = ({ spot, forecastArray, days, user, setUser }) => {
  const [bookmarked, setBookmarked] = useState(
    user ? (user.favorites ? user.favorites.includes(spot._id) : false) : false,
  );

  const getTime = (time) => {
    const date = new Date(time);
    return `${date.getHours().toString().padStart(2, '0')}:${
      date.getMinutes().toString().padStart(2, '0')}`;
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
        <div className="backBtn">
          <WindDirection windDirections={spot.windDirections} />
        </div>
        <div className="forecastInfo">
          <WindDirection windDirections={spot.windDirections} />
          <div className="forecastInfoText">
            <h3>{spot.name}</h3>
            <div className="spotInfos">
              <div className='sunriseSunset'>
                <div>
                  <Sunrise className="Icon"/>
                  {getTime(spot.sunrise)} 
                </div>
                <div>
                  <Sunset className="Icon"/>
                  {getTime(spot.sunset)}
                </div>
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
Infobar.propTypes = {
  spot: PropTypes.object.isRequired,
  forecastArray: PropTypes.array.isRequired,
  days: PropTypes.array.isRequired,
  user: PropTypes.object,
  setUser: PropTypes.func.isRequired,
};

export default Infobar;
