import React from 'react';
import '../assets/styles/Settings.css';
import { useNavigate } from 'react-router-dom';

import SignUp from '../assets/icons/SignUp.svg?react';
import SignIn from '../assets/icons/SignIn.svg?react';
import ColorMode from '../assets/icons/colorMode.svg?react';
import Dashboard from '../assets/icons/Dashboard.svg?react';
import WindSpeed from '../assets/icons/WindSpeed.svg?react';
import About from '../assets/icons/About.svg?react';
import SignOut from '../assets/icons/SignOut.svg?react';

const SettingsPage = ({ user, logout, settings, setSettings, setPath }) => {
  const navigate = useNavigate();

  const loggingOut = () => {
    logout();
    navigate('/');
  };
  return (
    <div className="Settings">
      <h2 className="Title">Settings</h2>
      <div className="Content">
        <div className="Links">
          {user ? (
            user.memberStatus === 'admin' || user.memberStatus === 'creator' ? (
              <button
                type="button"
                onClick={() => {
                  setPath('/adm-dashboard');
                  navigate('/adm-dashboard');
                }}
              >
                <Dashboard />
                Dashboard
              </button>
            ) : null
          ) : null}
          <div className="SettingsGroup">
            <div className="SettingsItem">
              <label htmlFor="windUnit">
                <WindSpeed />
                Wind Unit
              </label>
              <select
                name="windUnit"
                id="windUnit"
                value={settings.windUnit}
                onChange={(e) =>
                  setSettings({ ...settings, windUnit: e.target.value })
                }
              >
                <option value="kts">Kts</option>
                <option value="mph">mph</option>
                <option value="kph">km/h</option>
                <option value="ms">m/s</option>
                <option value="bft">Bft</option>
              </select>
            </div>
          </div>
          <div className="SettingsGroup">
            <div className="SettingsItem">
              <label htmlFor="colorMode">
                <ColorMode />
                Color Theme
              </label>
              <select
                name="colorMode"
                id="colorMode"
                value={settings.mode}
                onChange={(e) =>
                  setSettings({ ...settings, mode: e.target.value })
                }
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setPath('/info');
              navigate('/info');
            }}
          >
            <About />
            About
          </button>
        </div>
        {user ? (
          <button
            className="logoutBtn"
            type="button"
            onClick={() => loggingOut()}
          >
            <SignOut />
            Log out
          </button>
        ) : (
          <div className="Register">
            <button
              type="button"
              onClick={() => {
                setPath('/sign-in');
                navigate('/sign-in');
              }}
            >
              <SignIn />
              Log In
            </button>
            <button
              type="button"
              onClick={() => {
                setPath('/sign-up');
                navigate('/sign-up');
              }}
            >
              <SignUp />
              Register now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
