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
  const [spot, setSpot] = useState(null);
  const { spotName } = useParams();
  const [windUnit, setWindUnit] = useState('kts');
  const [displayNight, setDisplayNight] = useState(false);
  const [nightEnd, setNightEnd] = useState(7);
  const [nightStart, setNightStart] = useState(21);
  const [forecastArray, setForecastArray] = useState([]);

  const getNighttime = (time) => {
    return (
      moment(time).format('HH') < nightEnd ||
      moment(time).format('HH') > nightStart
    );
  };

  setAxiosHeader();

  const getSpot = async () => {
    axios
      .get(
        `${
          import.meta.env.VITE_API_BACKENDSERVER
        }/spot/name/${spotName}/forecast`,
      )
      .then((res) => {
        setForecastArray(generateForecastArray(res.data.spot.forecast));
        setSpot(res.data.spot);
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
          </div>
          <ForecastTable
            forecast={forecastArray}
            windUnit={windUnit}
            displayNight={displayNight}
            getNighttime={getNighttime}
          />
        </>
      ) : (
        'Loading'
      )}
    </div>
  );
};

export default Forecast;
