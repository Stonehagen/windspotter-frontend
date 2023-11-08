import React, { useState, useEffect, useRef, createRef } from 'react';
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
  const [forecastArray, setForecastArray] = useState([]);
  const [settings, setSettings] = useState({
    windUnit: 'kts',
    displayNight: false,
    nightEnd: 7,
    nightStart: 21,
  });

  const getNighttimeMorning = (time) => {
    return moment(time).format('HH') < settings.nightEnd;
  };

  const getNighttime = (time) => {
    return getNighttimeMorning(time) || moment(time).format('HH') > settings.nightStart;
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
            <ForecastOverview
              forecast={forecastArray}
              getNighttimeMorning={getNighttimeMorning}
            />
          </div>
          <ForecastTable
            forecast={forecastArray}
            settings={settings}
            getNighttime={getNighttime}
            getNighttimeMorning={getNighttimeMorning}
          />
        </>
      ) : (
        'Loading'
      )}
    </div>
  );
};

export default Forecast;
