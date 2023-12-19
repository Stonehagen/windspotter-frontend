import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useGenerateForecastArray } from '../hooks/useGenerateForecastArray';
import '../assets/styles/Forecast.css';

import ForecastTables from '../features/forecastTable/ForecastTables';
import ForecastOverview from '../features/forecastOverview/ForecastOverview';

const Forecast = ({ settings, setSettings }) => {
  const { spotName } = useParams();
  const [spot, setSpot] = useState(null);
  const [forecastArray, setForecastArray] = useState([]);
  const [days, setDays] = useState([]);

  const decimalToDMS = (decimal) => {
    const degrees = Math.trunc(decimal);
    const minutes = Math.trunc((decimal - degrees) * 60);
    const seconds = Math.trunc(((decimal - degrees) * 60 - minutes) * 60);
    return `${degrees}° ${minutes}' ${seconds}" `;
  };

  const getDirection = (decimal, latOrLon) => {
    if (latOrLon === 'lat') {
      return decimal > 0 ? 'N' : 'S';
    } else {
      return decimal > 0 ? 'E' : 'W';
    }
  };

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
          <div className="infoBar">
            <div className="forecastInfo">
              <h3>{spot.name}</h3>
              <div className="spotInfos">
                <div>
                  {decimalToDMS(spot.lat)}
                  <span>{getDirection(spot.lat, 'lat')}</span>
                </div>
                <div>
                  {decimalToDMS(spot.lon)}
                  <span>{getDirection(spot.lon, 'lon')}</span>
                </div>
              </div>
            </div>
            <ForecastOverview forecast={forecastArray} days={days} />
          </div>
          <ForecastTables
            forecast={forecastArray}
            days={days}
            settings={settings}
            setSettings={setSettings}
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
