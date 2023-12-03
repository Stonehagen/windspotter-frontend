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
    <div className="landingpage">
      <h1 className="Logo">
        WIND<span>MATE</span>
      </h1>
      <p className="landingpageText">
        Windmate is a website that provides you with the latest wind forecast
        for your favourite spots in Germany. This website is still in
        development and currently only supports a few locations. More locations
        will be added in the near future or upon request.
      </p>
      <div className="landingpageList">
        <p>Right now the following weather models are supported:</p>
        <ul>
          <li>ICON-D2 (48h)</li>
          <li>ICON-EU (5d)</li>
          <li>GFS (12d)</li>
        </ul>
      </div>
      <p className="landingpageText">
        To requrest a new location, a new feature or to report a bug, please
        send an email to{' '}
        <a href="mailto:tobias.steinhagen@me.com">
          {'tobias.steinhagen@me.com'}
        </a>
        .
      </p>
      <p className="landingpageText">
        For more information please visit my website{' '}
        <a href="https://stonehagen.com">{'stonehagen.com'}</a>.
      </p>
    </div>
  );
};

export default LandingPage;
