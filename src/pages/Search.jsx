import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../assets/styles/Search.css';

const Search = ({ user, setPath }) => {
  const [spots, setSpots] = useState([]);

  const getSpots = async () => {
    axios
      .get(`${import.meta.env.VITE_API_BACKENDSERVER}/spot/list`)
      .then((res) => setSpots(res.data.spots))
      .catch((err) => console.log(err));
    // need a redirect to main page if an error occurs
  };

  useEffect(() => {
    getSpots();
  }, []);

  return (
    <div className="search">
      <h3 className="LogoSub">
        SELECT<span>SPOT</span>
      </h3>
      <div className="Spotlist">
        {spots.map((spot) => (
          <Link
            key={spot._id}
            to={`/forecast/${spot.searchName}`}
            className="spotLink"
            onClick={() => {
              setPath(`/forecast/${spot.searchName}`);
            }}
          >
            <div>{spot.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Search;
