import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../assets/styles/Favorites.css';

const Favorites = ({ user }) => {
  const [favorites, setFavorites] = useState([]);

  const getFavorites = async () => {
    axios
      .get(
        `${import.meta.env.VITE_API_BACKENDSERVER}/user/favorites`,
      )
      .then((res) => {
        setFavorites(res.data.favorites);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <>
      <div className="Favorites">
        <h3>
          FAVORITE<span>SPOTS</span>
        </h3>
        {favorites
          ? favorites.map((spot) => (
              <Link
                key={spot._id}
                to={`/forecast/${spot.searchName}`}
                className="spotLink"
              >
                <div>{spot.name}</div>
              </Link>
            ))
          : null}
      </div>
    </>
  );
};

export default Favorites;
