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
  const [forecastArray, setForecastArray] = useState([]);

  const getNighttime = (time) => {
    return (
      moment(time).format('HH') < nightEnd ||
      moment(time).format('HH') > nightStart
    );
  };

  setAxiosHeader();

  const generateForecastArray = (forecast) => {
    const newForecastArray = [];
    if (
      !forecast.t_2m ||
      !forecast.v_10m ||
      !forecast.u_10m ||
      !forecast.vmax_10m ||
      !forecast.clct_mod ||
      !forecast.rain_gsp
    ) {
      setForecastArray('error');
      return;
    }
    // t_2m: temperature at 2m above ground is leading value
    const sortedDates = Object.keys(forecast.v_10m).sort((a, b) => {
      return new Date(a) - new Date(b);
    });

    for (const time of sortedDates) {
      const forecastTimestamp = new Date(time);
      const today = new Date().setHours(0, 0, 0, 0);
      if (forecastTimestamp.getTime() >= today) {
        const lastForecast = newForecastArray[newForecastArray.length - 1]
          ? newForecastArray[newForecastArray.length - 1]
          : {
              t: 0,
              dir: 0,
              ws: 0,
              wsMax: 0,
              clouds: 0,
              rain: 0,
              waveDir: 0,
              waveHeight: 0,
              wavePeriod: 0,
            };
        newForecastArray.push({
          time: forecastTimestamp,
          t:
            forecast.t_2m[time] !== undefined
              ? forecast.t_2m[time] - 273.15
              : lastForecast.t,
          dir:
            (270 -
              Math.atan2(forecast.v_10m[time], forecast.u_10m[time]) *
                (180 / Math.PI)) %
            360,
          ws: Math.sqrt(
            Math.pow(forecast.u_10m[time], 2) +
              Math.pow(forecast.v_10m[time], 2),
          ),
          wsMax: forecast.vmax_10m[time],
          clouds: forecast.clct_mod[time],
          rain: forecast.rain_gsp[time] ? forecast.rain_gsp[time] : 0,
          waveDir: forecast.mwd[time] ? forecast.mwd[time] : 0,
          waveHeight: forecast.swh[time] ? forecast.swh[time] : 0,
          wavePeriod: forecast.tm10[time] ? forecast.tm10[time] : 0,
        });
      }
    }
    setForecastArray(newForecastArray);
  };

  const getSpot = async () => {
    axios
      .get(
        `${
          import.meta.env.VITE_API_BACKENDSERVER
        }/spot/name/${spotName}/forecast`,
      )
      .then((res) => {
        generateForecastArray(res.data.spot.forecast);
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
      {spot ? (
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
