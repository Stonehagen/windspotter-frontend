import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/styles/LandingPage.css';
import { useNavigate } from 'react-router-dom';

const LandingPage = ({ user, logout }) => {
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
      {user ? null : <div className="landingHeader"></div>}
      <div className="LogoWrapper">
        <h1 className="Logo">
          WIND<span>MATE</span>
        </h1>
        <h2 className="LogoSub">
          WIND<span>PREDICTION</span> FOR <span>SURFERS</span>
        </h2>
      </div>
      {user ? (
        <div className="Logout">
          <button type="button" onClick={() => logout()}>
            LOG<span>OUT</span>
          </button>
        </div>
      ) : (
        <div className="Register">
          <button type="button" onClick={() => navigate('/sign-in')}>
            LOG<span>IN</span>
          </button>
          <button type="button" onClick={() => navigate('/sign-up')}>
            REGISTER<span>NOW</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
