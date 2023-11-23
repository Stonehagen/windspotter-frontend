import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { setAxiosHeader } from '../methods/setAxiosHeader';
import { generateForecastArray } from '../methods/generateForecastArray';
import '../styles/Forecast.css';

import BackBtn from '../assets/back.svg?react';

import ForecastTables from './ForecastTables';
import ForecastOverview from './ForecastOverview';

const Forecast = () => {
  const { spotName } = useParams();
  const [spot, setSpot] = useState(null);
  const [forecastArray, setForecastArray] = useState([]);
  const [days, setDays] = useState([]);
  const [settings, setSettings] = useState({
    windUnit: 'kts',
    displayNight: false,
    nightEnd: 7,
    nightStart: 21,
  });

  setAxiosHeader();

  const getSpot = async () => {
    axios
      .get(
        `${
          import.meta.env.VITE_API_BACKENDSERVER
        }/spot/name/${spotName}/forecast`,
      )
      .then((res) => {
        const forecastArr = generateForecastArray(
          res.data.spot.forecast,
          settings.nightEnd,
        );
        setForecastArray(forecastArr);
        setDays([...new Set(forecastArr.map((timeframe) => timeframe.day))]);
        setSpot({ name: res.data.spot.name });
      })
      .catch((err) => console.log(err));
    // need a redirect to main page if an error occurs
  };

  useEffect(() => {
    getSpot();
  }, []);

  return (
    <div className="Forecast">
      {spot && forecastArray && days ? (
        <>
          <div className="infoBar">
            <div className="forecastInfo">
              <div className="backButton">
                <Link to="/">
                  <BackBtn />
                </Link>
              </div>
              <h3>{spot.name}</h3>
            </div>
            <ForecastOverview forecast={forecastArray} days={days} />
          </div>
          <ForecastTables
            forecast={forecastArray}
            days={days}
            settings={settings}
          />
        </>
      ) : (
        <div className="Loading">
          Try to get your WIND<span>MATE</span>...
        </div>
      )}
    </div>
  );
};

export default Forecast;
