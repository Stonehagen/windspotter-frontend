import MapDark from '../assets/icons/MapDark.svg?react';
import MapLight from '../assets/icons/MapLight.svg?react';
import WindDark from '../assets/icons/WindDark.svg?react';
import WindLight from '../assets/icons/WindLight.svg?react';
import HomeDark from '../assets/icons/HomeDark.svg?react';
import HomeLight from '../assets/icons/HomeLight.svg?react';

import '../styles/NavBar.css';
import { Link } from 'react-router-dom';

const NavBar = ({ mode }) => {
  console.log(mode);
  return (
    <div className="navbar">
      <div className="navbarHome">
        <Link to="/">{mode === 'dark' ? <HomeLight /> : <HomeDark />}</Link>
      </div>
      <div className="navbarMap">
        <Link to="/map">{mode === 'dark' ? <MapLight /> : <MapDark />}</Link>
      </div>
      <div className="navbarForecast">
        <Link to="/search">
          {mode === 'dark' ? <WindLight /> : <WindDark />}
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
