import Map from '../../assets/icons/Map.svg?react';
import Wind from '../../assets/icons/Wind.svg?react';
import Home from '../../assets/icons/Home.svg?react';
import Settings from '../../assets/icons/Settings.svg?react';

import '../../assets/styles/NavBar.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const NavBar = () => {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {}, [path]);

  return (
    <div className="navbar">
      <div className="navbarHome">
        <Link to="/" onClick={() => setPath('/')}>
          <Home className={`NavIcon ${path == '/' ? 'active' : ''}`} />
        </Link>
      </div>
      <div className="navbarMap">
        <Link to="/map" onClick={() => setPath('/map')}>
          <Map className={`NavIcon ${path == '/map' ? 'active' : ''}`} />
        </Link>
      </div>
      <div className="navbarForecast">
        <Link to="/search" onClick={() => setPath('/search')}>
          <Wind className={`NavIcon ${path == '/search' ? 'active' : ''}`} />
        </Link>
      </div>
      <div className="navbarInfo">
        <Link to="/settings" onClick={() => setPath('/settings')}>
          <Settings
            className={`NavIcon ${path == '/settings' ? 'active' : ''}`}
          />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
