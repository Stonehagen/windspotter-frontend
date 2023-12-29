import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/AddSpot.css';

const AddSpot = ({ user }) => {
  const [spotName, setSpotName] = useState('');
  const [searchName, setSearchName] = useState('');
  const [spotLat, setSpotLat] = useState('');
  const [spotLng, setSpotLng] = useState('');
  const [windDirections, setWindDirections] = useState([]);
  const [errors, setErrors] = useState([
    { msg: 'please enter a valid spot name' },
  ]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (spotName.length < 5) {
      setErrors([{ msg: 'username must be at least 5 characters long' }]);
      return;
    }
    if (spotName.search(/[a-zA-Z]/) === -1) {
      setErrors([{ msg: 'spotname must contain at least one letter' }]);
      return;
    }
    if (spotName.length > 30) {
      setErrors([{ msg: 'spotname must be shorter than 30 characters' }]);
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
      .post(`${import.meta.env.VITE_API_BACKENDSERVER}/spot/add-spot`, {
        spotName,
        spotLat,
        spotLng,
      })
      .then()
      .catch((err) =>
        setErrors(err.response.data.errors ? err.response.data.errors : []),
      );
  };

  return (
    <div className="AddSpot">
      <form onSubmit={handleSubmit}>
        <div className="SignUp-form-grp">
          <h3>
            ADD<span>SPOT</span>
          </h3>
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
          <div className="formGroup">
            <label htmlFor="spotLat">Latitude</label>
            <input
              name="spotLat"
              value={spotLat}
              id="spotLat"
              placeholder="spotLat"
              type="text"
              onChange={(e) => setSpotLat(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label htmlFor="spotLng">Longitude</label>
            <input
              name="spotLng"
              value={spotLng}
              id="spotLng"
              placeholder="spotLng"
              type="text"
              onChange={(e) => setSpotLng(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label htmlFor="windDirections">WindDirections</label>
            <input
              name="windDirections"
              value={windDirections}
              id="windDirections"
              placeholder="windDirections"
              type="text"
              onChange={(e) => setWindDirections(e.target.value)}
            />
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
        <div className="SignUp-btn-grp">
          <button type="submit">
            SEND<span>IT</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSpot;
