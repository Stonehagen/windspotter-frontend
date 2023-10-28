import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { setAxiosHeader } from '../methods/setAxiosHeader';
import '../styles/Forecast.css';

import ForecastTable from './ForecastTable';

const Forecast = () => {
  const [spot, setSpot] = useState(null);
  const { spotName } = useParams();
  const [windUnit, setWindUnit] = useState('kts');
  const [displayNight, setDisplayNight] = useState(false);
  const [nightEnd, setNightEnd] = useState(7);
  const [nightStart, setNightStart] = useState(21);

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
      .then((res) => setSpot(res.data.spot))
      .catch((err) => console.log(err));
    // need a redirect to main page if an error occurs
  };

  useEffect(() => {
    getSpot();
  }, []);

  return (
    <div className="Forecast">
      {spot ? (
        <>
          <h2>{spot.name}</h2>
          <ForecastTable
            forecast={spot.forecast}
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
