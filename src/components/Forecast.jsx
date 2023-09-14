import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { setAxiosHeader } from '../methods/setAxiosHeader';
import '../styles/Forecast.css';

const Forecast = () => {
  const [spot, setSpot] = useState(null);
  const { spotName } = useParams();

  setAxiosHeader();

  const getSpots = async () => {
    axios
      .get(`${import.meta.env.VITE_API_BACKENDSERVER}/spot/name/${spotName}/forecast`)
      .then((res) => setSpot(res.data.spot))
      .catch((err) => console.log(err))
  };

  useEffect(() => {
    getSpots();
  }, []);

  return (
    <div className="Forecast">
      {spot ? spot.name : 'Loading...'}
    </div>
  );
};

export default Forecast;
