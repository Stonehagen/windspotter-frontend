import axios from 'axios';
import { useState } from 'react';
import '../../assets/styles/AddSpot.css';

import LatLonPicker from './LatLonPicker';

const AddSpot = () => {
  const [spotName, setSpotName] = useState('');
  const [searchName, setSearchName] = useState('');
  const [spotLat, setSpotLat] = useState(54);
  const [spotLng, setSpotLng] = useState(11);
  const [windDirections, setWindDirections] = useState(Array(16).fill(false));
  const [errors, setErrors] = useState([]);

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
    if (spotName.length < 5) {
      setErrors([{ msg: 'Spot name must be at least 5 characters long' }]);
      return;
    }
    if (spotName.search(/[a-zA-Z]/) === -1) {
      setErrors([{ msg: 'Spot name must contain at least one letter' }]);
      return;
    }
    if (spotName.length > 50) {
      setErrors([{ msg: 'Spot name must be shorter than 50 characters' }]);
      return;
    }
    if (spotLat.search(/[0-9]/) === -1) {
      setErrors([{ msg: 'please enter a valid latitude' }]);
      return;
    }
    if (spotLng.search(/[0-9]/) === -1) {
      setErrors([{ msg: 'please enter a valid longitude' }]);
      return;
    }
    axios
      .post(`${import.meta.env.VITE_API_BACKENDSERVER}/spot/add`, {
        name: spotName,
        searchName,
        lat: spotLat,
        lon: spotLng,
        windDirections,
      })
      .then()
      .catch((err) =>
        setErrors(err.response.data.errors ? err.response.data.errors : []),
      );
  };

  return (
    <div className="AddSpot">
      <form onSubmit={handleSubmit}>
        <div>
          <h3 className="TitleSub">Add a new Spot</h3>
          <div className="formGroup">
            <label htmlFor="spotName">Spotname</label>
            <input
              name="spotName"
              value={spotName}
              id="spotName"
              placeholder="spotName"
              type="text"
              onChange={(e) => setSpotName(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label htmlFor="searchName">Searchname</label>
            <input
              name="searchName"
              value={searchName}
              id="searchName"
              placeholder="searchName"
              type="text"
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>
          <div className="MapContainer">
            <label>Pick a Spot Location</label>
            <LatLonPicker
              setSpotLat={setSpotLat}
              spotLat={spotLat}
              setSpotLng={setSpotLng}
              spotLng={spotLng}
            />
            <div className="LatLon">
              <div>Lat: {spotLat.toFixed(5)}</div>
              <div>Lon: {spotLng.toFixed(5)}</div>
            </div>
          </div>
          <div>
            <label htmlFor="windDirections">WindDirections</label>
            <ul className="windDirections">
              {windDirectionsList.map((direction, index) => {
                const main =
                  direction === 'N' ||
                  direction === 'S' ||
                  direction === 'E' ||
                  direction === 'W';
                return (
                  <li
                    className={`windDirection ${
                      windDirections[index] ? 'selected' : ''
                    }`}
                    key={index}
                    style={{
                      transform: `rotate(${
                        index * 22.5 - 11.25
                      }deg) skewY(-67.5deg)`,
                    }}
                    onClick={() => {
                      const newWindDirections = [...windDirections];
                      newWindDirections[index] = !newWindDirections[index];
                      setWindDirections(newWindDirections);
                    }}
                  >
                    <div
                      className="text"
                      style={{
                        fontWeight: `${main ? 600 : 200}`,
                        fontSize: `${main ? 0.8 : 0.5}em`,
                        paddingTop: `${main ? 0.3 : 1}em`,
                      }}
                    >
                      {direction}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="messages">
            {errors.map((error, index) => {
              return (
                <p className="errorMessage" key={index}>
                  - ! {error.msg}
                </p>
              );
            })}
          </div>
        </div>
        <div>
          <button type="submit">Add Spot</button>
        </div>
      </form>
    </div>
  );
};

export default AddSpot;
