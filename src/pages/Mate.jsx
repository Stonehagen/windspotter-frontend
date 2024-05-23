import React, { useState } from 'react';
import axios from 'axios';
import '../assets/styles/Mate.css';

import { getWindDirection } from '../utils/getWindDirection';
import SpotCharts from '../features/spotCharts/SpotCharts';

const Mate = ({ user, setPath }) => {
  const [spotCharts, setSpotCharts] = useState([]);
  const [day, setDay] = useState('');
  const [hourStart, setHourStart] = useState(14);
  const [hourEnd, setHourEnd] = useState(21);
  const [minWindSpeedKts, setMinWindSpeedKts] = useState(11);
  const [maxWindSpeedKts, setMaxWindSpeedKts] = useState(35);
  const [checkWindDirections, setCheckWindDirections] = useState(true);
  const [status, setStatus] = useState('');

  const ktToMs = 0.514444;

  const windDirectionsList = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    setSpotCharts([]);
    getSpot();
  };

  const getSpot = async () => {
    axios
      .post(`${import.meta.env.VITE_API_BACKENDSERVER}/spot/day`, {
        day: day != '' ? new Date(day).toISOString() : new Date().toISOString(),
      })
      .then((res) => {
        // remove the lightforecast for the spots that are before the sunrise or after the sunset
        // remove the lightforecast for the spots that are not in the selected time range
        // remove the lightforecast for the spots that are not in the selected wind speed range
        // remove the lightforecast for the spots that are not in the selected wind direction range,
        const filteredSpots = res.data.spots.map((spot) => {
          const sunrise = new Date(spot.sunrise);
          const sunset = new Date(spot.sunset);
          sunrise.setFullYear(1970, 0, 1);
          sunset.setFullYear(1970, 0, 1);
          return {
            ...spot,
            lightForecast: spot.lightForecast.filter((forecast) => {
              const time = new Date(forecast.time);
              time.setFullYear(1970, 0, 1);
              const isRightWindDirection = checkWindDirections
                ? windDirectionsList.some((direction, index) => {
                    return (
                      spot.windDirections[index] &&
                      getWindDirection(forecast.dir) === direction
                    );
                  })
                : true;
              return (
                time >= sunrise &&
                time <= sunset &&
                time.getHours() >= hourStart &&
                time.getHours() <= hourEnd &&
                forecast.ws >= minWindSpeedKts * ktToMs &&
                forecast.ws <= maxWindSpeedKts * ktToMs &&
                isRightWindDirection
              );
            }),
          };
        });

        // now sumup the wind speeds for each spot and rank them delete the spots that have no lightforecast left
        const rankedSpots = filteredSpots
          .map((spot) => {
            const windSpeedSum = spot.lightForecast.reduce(
              (sum, forecast) => sum + forecast.ws / ktToMs,
              0,
            );
            const minWind = Math.min(
              ...spot.lightForecast.map((forecast) => forecast.ws / ktToMs),
            );
            const maxWind = Math.max(
              ...spot.lightForecast.map((forecast) => forecast.ws / ktToMs),
            );
            const minGust = Math.min(
              ...spot.lightForecast.map((forecast) => forecast.wsMax / ktToMs),
            );
            const maxGust = Math.max(
              ...spot.lightForecast.map((forecast) => forecast.wsMax / ktToMs),
            );
            return {
              ...spot,
              windSpeedSum,
              minWind,
              maxWind,
              minGust,
              maxGust,
            };
          })
          .filter((spot) => spot.lightForecast.length > 0);

        rankedSpots.sort((a, b) => b.windSpeedSum - a.windSpeedSum);
        setSpotCharts(rankedSpots);
        if (rankedSpots.length === 0) {
          setStatus('No spots found');
        }
      })
      .catch((err) => console.log(err));
    // need a redirect to main page if an error occurs
  };

  return (
    <div className="Mate">
      <form onSubmit={handleSubmit}>
        <div className="Mate-form-grp">
          <h3>
            BEST<span>SPOT</span>
          </h3>
          <div className="formGroup">
            <label htmlFor="day">Date</label>
            <select
              name="day"
              id="day"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            >
              {[...Array(7).keys()].map((day) => {
                const date = new Date();
                date.setDate(date.getDate() + day);
                return (
                  <option key={day} value={date.toISOString().split('T')[0]}>
                    {date.toDateString()}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="timeGroup">
            <div className="formGroup">
              <label htmlFor="hourStart">From</label>
              <select
                name="hourStart"
                id="hourStart"
                value={hourStart}
                onChange={(e) => setHourStart(e.target.value)}
              >
                {[...Array(23).keys()].map((hour) => (
                  <option key={hour} value={hour}>
                    {hour.toString().padStart(2, '0')}:00
                  </option>
                ))}
              </select>
            </div>
            <div className="formGroup">
              <label htmlFor="hourEnd">To</label>
              <select
                name="hourEnd"
                id="hourEnd"
                value={hourEnd}
                onChange={(e) => setHourEnd(e.target.value)}
              >
                {[...Array(23).keys()].map((hour) => (
                  <option key={hour} value={hour + 1}>
                    {(hour + 1).toString().padStart(2, '0')}:00
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="formGroup wind">
            <label htmlFor="minWindSpeedKts">Min Wind Speed (kt)</label>
            <input
              name="minWindSpeedKts"
              id="minWindSpeedKts"
              type="number"
              value={minWindSpeedKts}
              onChange={(e) => setMinWindSpeedKts(e.target.value)}
            />
          </div>
          <div className="formGroup wind">
            <label htmlFor="maxWindSpeedKts">Max Wind Speed (kt)</label>
            <input
              name="maxWindSpeedKts"
              id="maxWindSpeedKts"
              type="number"
              value={maxWindSpeedKts}
              onChange={(e) => setMaxWindSpeedKts(e.target.value)}
            />
          </div>
          <div className="formGroup dir">
            <label htmlFor="checkWindDirections">Check Wind Directions</label>
            <input
              name="checkWindDirections"
              id="checkWindDirections"
              type="checkbox"
              checked={checkWindDirections}
              onChange={(e) => setCheckWindDirections(e.target.checked)}
            />
          </div>
        </div>
        <div className="Mate-btn-grp">
          <button type="submit">
            GET<span>SPOT</span>
          </button>
        </div>
      </form>
      {spotCharts && spotCharts.length > 0 ? (
        <SpotCharts spotCharts={spotCharts} user={user} setPath={setPath} />
      ) : (
        <div>{status}</div>
      )}
    </div>
  );
};

export default Mate;
