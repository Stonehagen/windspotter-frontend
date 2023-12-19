import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useGenerateForecastArray } from '../hooks/useGenerateForecastArray';
import '../assets/styles/Forecast.css';

import ForecastTables from '../features/forecastTable/ForecastTables';
import ForecastOverview from '../features/forecastOverview/ForecastOverview';
import Infobar from '../features/infobar/Infobar';

const Forecast = ({ settings, setSettings, mode, user, setUser }) => {
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
        const forecastArr = useGenerateForecastArray(
          res.data.spot.forecast,
          settings.nightEnd,
          res.data.spot.forecastModels,
        );
        setForecastArray(forecastArr);
        setDays([...new Set(forecastArr.map((timeframe) => timeframe.day))]);
        setSpot({
          _id: res.data.spot._id,
          name: res.data.spot.name,
          lat: res.data.spot.lat,
          lon: res.data.spot.lon,
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
            setSettings={setSettings}
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
