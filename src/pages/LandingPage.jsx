import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/styles/LandingPage.css';

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
    <div className="landingpage">
      <h1 className="Logo">
        WIND<span>MATE</span>
      </h1>
    </div>
  );
};

export default LandingPage;
