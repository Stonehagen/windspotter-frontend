import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import '../assets/styles/Forecast.css';

import ForecastTables from '../features/forecastTable/ForecastTables';
import Infobar from '../features/infobar/Infobar';

const Forecast = ({ settings, updateSettings, mode, user, setUser }) => {
  const { spotName } = useParams();
  const [spot, setSpot] = useState(null);
  const [forecastArray, setForecastArray] = useState([]);
  const [days, setDays] = useState([]);
  const [updateTimes, setUpdateTimes] = useState(null);

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

  const getUpdateTimes = (fCastArry) => {
    const getTime = (time) => {
      const date = new Date(time);
      return `${date.getDate().toString().padStart(2, '0')}.${
        date.getMonth().toString().padStart(2, '0')}. ${
        date.getHours().toString().padStart(2, '0')}:${
        date.getMinutes().toString().padStart(2, '0')}`;
    };

    const updateTimes = fCastArry.reduce((acc, curr) => {
      if (!acc[curr.model]) {
        acc[curr.model] = getTime(curr.modelTime);
      }
      return acc;
    }
    , {});
    console.log(updateTimes);

    setUpdateTimes(updateTimes);
  };


  useEffect(() => {
    const getSpot = async () => {
      axios
        .get(
          `${
            import.meta.env.VITE_API_BACKENDSERVER
          }/spot/name/${spotName}/forecast`,
        )
        .then((res) => {
          setForecastArray(res.data.spot.forecast);
          getUpdateTimes(res.data.spot.forecast);
          setDays([
            ...new Set(res.data.spot.forecast.map((timeframe) => timeframe.day)),
          ]);
          setSpot({
            _id: res.data.spot._id,
            name: res.data.spot.name,
            sunrise: res.data.spot.sunrise,
            sunset: res.data.spot.sunset,
            lat: res.data.spot.lat,
            lon: res.data.spot.lon,
            windDirections: res.data.spot.windDirections,
          });
        })
        .catch((err) => console.log(err));
      // need a redirect to main page if an error occurs
    };

    
    getSpot();
  }, [spotName]);

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
            sunRise={spot.sunrise}
            sunSet={spot.sunset}
          />
          <div className="spotInfos">
            <h4>Last Model Updates</h4>
            <div className='spotInfosUpdates'>
              {updateTimes? (
                Object.keys(updateTimes).map((key) => (
                  <div key={key} className='spotInfosUpdatesRow'>
                    <div className='spotInfosUpdatesModel'>{key === 'gfsAWS' ? 'GFS' : key.toUpperCase()}:</div>
                    <span>{updateTimes[key]}</span>
                  </div>
                ))
              ) : ''}
            </div>
            <h4>Spot Location</h4>
            <div className='spotInfosLocation'>
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
        </>
      ) : (
        <div className="Loading">
          Try to get your WIND<span>MATE</span>...
        </div>
      )}
    </div>
  );
};
Forecast.propTypes = {
  settings: PropTypes.object.isRequired,
  updateSettings: PropTypes.func.isRequired,
  mode: PropTypes.string,
  user: PropTypes.object,
  setUser: PropTypes.func.isRequired,
};

export default Forecast;