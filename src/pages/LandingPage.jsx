import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/styles/LandingPage.css';
import { useNavigate } from 'react-router-dom';

const LandingPage = ({ user }) => {
  const [spots, setSpots] = useState([]);

  const navigate = useNavigate();

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
      <div className="landingHeader"></div>
      <div>
        <h1 className="Logo">
          WIND<span>MATE</span>
        </h1>
        <h2 className="LogoSub">
          WIND<span>PREDICTION</span> FOR <span>SURFERS</span>
        </h2>
      </div>
      <div className="Register">
        {/* <h2>REGISTER NOW</h2> */}
        {/* <p>
          Get favourite spots, kitesize and spot recommendations based on your
          profile.
        </p> */}
        <button type="button" onClick={() => navigate('/sign-in')}>
          LOG<span>IN</span>
        </button>
        <button type="button" onClick={() => navigate('/sign-up')}>
          REGISTER<span>NOW</span>
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
