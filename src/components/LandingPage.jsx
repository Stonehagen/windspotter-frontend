import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
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
    <>
      <div>
        <h1 className="Logo">
          WIND<span>MATE</span>
        </h1>
      </div>
      <div className="LandingPage">
        <Link to={`/map/`} className="spotLink">
          <div>Map Beta</div>
        </Link>
      </div>
      <div className="Spotlist">
        <h3 className="LogoSub">
          SELECT<span>SPOT</span>
        </h3>
        {spots.map((spot) => (
          <Link
            key={spot._id}
            to={`/forecast/${spot.searchName}`}
            className="spotLink"
          >
            <div>{spot.name}</div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default LandingPage;
