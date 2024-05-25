import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../assets/styles/Search.css';

const Search = ({ user, setPath }) => {
  const [spots, setSpots] = useState([]);
  const [searchName, setSearchName] = useState('');

  const getSpots = async () => {
    axios
      .get(`${import.meta.env.VITE_API_BACKENDSERVER}/spot/list`)
      .then((res) => setSpots(res.data.spots))
      .catch((err) => console.log(err));
    // need a redirect to main page if an error occurs
  };

  const searchSpot = async (searchName) => {
    axios
      .get(
        `${import.meta.env.VITE_API_BACKENDSERVER}/spot/search/${searchName}`,
      )
      .then((res) => {
        setSpots(res.data.spots);
      })
      .catch((err) => console.log(err));
  };

  const submitSearch = (e) => {
    e.preventDefault();
    searchSpot(searchName);
  };

  useEffect(() => {
    getSpots();
  }, []);

  return (
    <div className="search">
      <h3 className="LogoSub">
        SELECT<span>SPOT</span>
      </h3>
      <form className="searchForm" onSubmit={submitSearch}>
        <div className="formGroup">
          <input
            type="text"
            placeholder="search spot..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <button type="submit">GO</button>
        </div>
      </form>
      <div className="Spotlist">
        {spots.map((spot) => (
          <Link
            key={spot._id}
            to={`/forecast/${spot.searchName}`}
            className="spotLink"
            onClick={() => {
              setPath(`/forecast/${spot.searchName}`);
            }}
          >
            <div>{spot.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Search;
