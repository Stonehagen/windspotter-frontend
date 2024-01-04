import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../assets/styles/Forecast.css';

import ForecastTables from '../features/forecastTable/ForecastTables';
import Infobar from '../features/infobar/Infobar';

const Forecast = ({ settings, updateSettings, mode, user, setUser }) => {
  const { spotName } = useParams();
  const [spot, setSpot] = useState(null);
  const [forecastArray, setForecastArray] = useState([]);
  const [days, setDays] = useState([]);

  const getSpot = async () => {
    axios
      .get(
        `${
          import.meta.env.VITE_API_BACKENDSERVER
        }/spot/name/${spotName}/forecast`,
      )
      .then((res) => {
        setForecastArray(res.data.spot.forecast);
        setDays([
          ...new Set(res.data.spot.forecast.map((timeframe) => timeframe.day)),
        ]);
        setSpot({
          _id: res.data.spot._id,
          name: res.data.spot.name,
          lat: res.data.spot.lat,
          lon: res.data.spot.lon,
          windDirections: res.data.spot.windDirections,
        });
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
          <Infobar
            spot={spot}
            forecastArray={forecastArray}
            days={days}
            user={user}
            setUser={setUser}
          />
          <ForecastTables
            forecast={forecastArray}
            days={days}
            settings={settings}
            updateSettings={updateSettings}
            mode={mode}
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
