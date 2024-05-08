import Wand from '../../assets/icons/Wand.svg?react';
import Wind from '../../assets/icons/Wind.svg?react';
import Home from '../../assets/icons/Home.svg?react';
import Settings from '../../assets/icons/Settings.svg?react';

import '../../assets/styles/NavBar.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const NavBar = ({ path, setPath }) => {
  useEffect(() => {}, [path]);

  return (
    <div className="navbar">
      <div className="navbarHome">
        <Link to="/" onClick={() => setPath('/')}>
          <Home className={`NavIcon ${path == '/' ? 'active' : ''}`} />
        </Link>
      </div>
      <div className="navbarForecast">
        <Link to="/search" onClick={() => setPath('/search')}>
          <Wind className={`NavIcon ${path == '/search' ? 'active' : ''}`} />
        </Link>
      </div>
      {/* <div className="navbarWand">
        <Link to="/mate" onClick={() => setPath('/mate')}>
          <Wand className={`NavIcon ${path == '/mate' ? 'active' : ''}`} />
        </Link>
      </div> */}
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
