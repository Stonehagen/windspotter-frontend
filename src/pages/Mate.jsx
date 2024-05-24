import React, { useState } from 'react';
import axios from 'axios';
import '../assets/styles/Mate.css';

import { getWindDirection } from '../utils/getWindDirection';
import SpotCharts from '../features/spotCharts/SpotCharts';

const Mate = ({
  user,
  setPath,
  spotCharts,
  setSpotCharts,
  searchSettings,
  setSearchSettings,
}) => {
  const [status, setStatus] = useState('');
  const [maxWindSpeedKts, setMaxWindSpeedKts] = useState(0);

  const ktToMs = 0.514444;

  const updateSearchSettings = (newSettings) => {
    setSearchSettings({ ...searchSettings, ...newSettings });
  };

  const getWindScore = (windspeed) => {
    const windscore =
      ((windspeed / ktToMs - searchSettings.minWindSpeedKts) /
        (maxWindSpeedKts - searchSettings.minWindSpeedKts)) *
        0.7 +
      0.3;
    return windscore;
  };

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
        day: searchSettings.day,
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
            lightForecast: spot.lightForecast
              .filter((forecast) => {
                const time = new Date(forecast.time);
                time.setFullYear(1970, 0, 1);
                const isRightWindDirection = searchSettings.checkWindDirections
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
                  time.getHours() >= searchSettings.hourStart &&
                  time.getHours() <= searchSettings.hourEnd &&
                  forecast.ws >= searchSettings.minWindSpeedKts * ktToMs &&
                  forecast.ws <= searchSettings.maxWindSpeedKts * ktToMs &&
                  isRightWindDirection
                );
              })
              .map((forecast) => {
                return {
                  ...forecast,
                  hour: new Date(forecast.time).getHours(),
                };
              }),
          };
        });

        // now sumup the wind speeds for each spot and rank them delete the spots that have no lightforecast left
        const rankedSpots = filteredSpots
          .map((spot) => {
            const windSpeedSum = spot.lightForecast.reduce(
              (sum, forecast) =>
                sum +
                (forecast.ws / ktToMs - searchSettings.minWindSpeedKts + 0.1) *
                  1.5,
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
        setMaxWindSpeedKts(
          Math.max(...rankedSpots.map((spot) => spot.maxWind), 0),
        );
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
              value={searchSettings.day}
              onChange={(e) => updateSearchSettings({ day: e.target.value })}
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
                value={searchSettings.hourStart}
                onChange={(e) =>
                  updateSearchSettings({ hourStart: e.target.value })
                }
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
                value={searchSettings.hourEnd}
                onChange={(e) =>
                  updateSearchSettings({ hourEnd: e.target.value })
                }
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
            <label htmlFor="minWindSpeedKts">Min Wind Speed (kts)</label>
            <input
              name="minWindSpeedKts"
              id="minWindSpeedKts"
              type="number"
              value={searchSettings.minWindSpeedKts}
              onChange={(e) =>
                updateSearchSettings({ minWindSpeedKts: e.target.value })
              }
            />
          </div>
          <div className="formGroup wind">
            <label htmlFor="maxWindSpeedKts">Max Wind Speed (kts)</label>
            <input
              name="maxWindSpeedKts"
              id="maxWindSpeedKts"
              type="number"
              value={searchSettings.maxWindSpeedKts}
              onChange={(e) =>
                updateSearchSettings({ maxWindSpeedKts: e.target.value })
              }
            />
          </div>
          <div className="formGroup dir">
            <label htmlFor="checkWindDirections">Check Wind Directions</label>
            <input
              name="checkWindDirections"
              id="checkWindDirections"
              type="checkbox"
              checked={searchSettings.checkWindDirections}
              onChange={(e) =>
                updateSearchSettings({ checkWindDirections: e.target.checked })
              }
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
        <SpotCharts
          spotCharts={spotCharts}
          setPath={setPath}
          getWindScore={getWindScore}
        />
      ) : (
        <div>{status}</div>
      )}
    </div>
  );
};

export default Mate;
