import MapDark from '../assets/icons/MapDark.svg?react';
import MapLight from '../assets/icons/MapLight.svg?react';
import MapActive from '../assets/icons/MapActive.svg?react';
import WindDark from '../assets/icons/WindDark.svg?react';
import WindLight from '../assets/icons/WindLight.svg?react';
import WindActive from '../assets/icons/WindActive.svg?react';
import HomeDark from '../assets/icons/HomeDark.svg?react';
import HomeLight from '../assets/icons/HomeLight.svg?react';
import HomeActive from '../assets/icons/HomeActive.svg?react';

import '../styles/NavBar.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const NavBar = ({ mode }) => {
  const [path, setPath] = useState(window.location.pathname);
  const [active, setActive] = useState(path);

  useEffect(() => {}, [path]);

  return (
    <div className="navbar">
      <div
        className="navbarHome"
        onMouseOver={() => setActive('/')}
        onMouseOut={() => setActive(path)}
      >
        <Link to="/" onClick={() => setPath('/')}>
          {active === '/' ? (
            <HomeActive />
          ) : mode === 'dark' ? (
            <HomeLight />
          ) : (
            <HomeDark />
          )}
        </Link>
      </div>
      <div
        className="navbarMap"
        onMouseOver={() => setActive('/map')}
        onMouseOut={() => setActive(path)}
      >
        <Link to="/map" onClick={() => setPath('/map')}>
          {active === '/map' ? (
            <MapActive />
          ) : mode === 'dark' ? (
            <MapLight />
          ) : (
            <MapDark />
          )}
        </Link>
      </div>
      <div
        className="navbarForecast"
        onMouseOver={() => setActive('/search')}
        onMouseOut={() => setActive(path)}
      >
        <Link to="/search" onClick={() => setPath('/search')}>
          {active === '/search' ? (
            <WindActive />
          ) : mode === 'dark' ? (
            <WindLight />
          ) : (
            <WindDark />
          )}
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
