import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { setAxiosHeader } from '../methods/setAxiosHeader';
import { generateForecastArray } from '../methods/generateForecastArray';
import '../styles/Forecast.css';

import ForecastTable from './ForecastTable';
import ForecastOverview from './ForecastOverview';

const Forecast = () => {
  const { spotName } = useParams();
  const [spot, setSpot] = useState(null);
  const [forecastArray, setForecastArray] = useState([]);
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
        setForecastArray(
          generateForecastArray(res.data.spot.forecast, settings.nightEnd),
        );
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
      {spot && forecastArray ? (
        <>
          <div className="infoBar">
            <h3>{spot.name}</h3>
            <ForecastOverview
              forecast={forecastArray}
            />
          </div>
          <ForecastTable
            forecast={forecastArray}
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
