import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { setAuthToken, getAuthToken } from './utils/authToken';
import { setAxiosHeader } from './utils/setAxiosHeader';
import './assets/styles/App.css';
import 'maplibre-gl';
import '@maplibre/maplibre-gl-leaflet';

import Forecast from './pages/Forecast';
import LandingPage from './pages/LandingPage';
import Map from './pages/Map';
import NavBar from './features/navbar/NavBar';
import Search from './pages/Search';
import Info from './pages/Info';
import SettingsPage from './pages/Settings';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';

const App = () => {
  const [user, setUser] = useState();
  const [settings, setSettings] = useState({
    windUnit: 'kts',
    displayNight: false,
    nightEnd: 7,
    nightStart: 21,
    mode: 'light',
  });
  const [prefersColorScheme, setPrefersColorScheme] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light',
  );
  const [mode, setMode] = useState(null);
  const [cookies, removeCookie] = useCookies(['jwt_token']);

  const token = getAuthToken(cookies);

  if (token) {
    setAuthToken(token);
  }

  setAxiosHeader();

  const login = ({ username, email, _id, memberStatus }) => {
    setUser({
      id: _id,
      username,
      email,
      memberStatus,
    });
  };

  const logout = () => {
    removeCookie('jwt_token');
    setAuthToken();
    setUser(null);
  };

  const getUser = async () => {
    axios.get(`${import.meta.env.VITE_API_BACKENDSERVER}/session`).then((res) =>
      setUser({
        email: res.data.email,
        id: res.data._id,
        memberStatus: res.data.memberStatus,
        favorites: res.data.favorites,
      }),
    );
  };

  useEffect(() => {
    if (settings.mode !== 'auto' && settings.mode !== mode) {
      setMode(settings.mode);
      document.documentElement.setAttribute('data-theme', settings.mode);
    } else if (settings.mode === 'auto') {
      setMode(prefersColorScheme);
      document.documentElement.setAttribute('data-theme', prefersColorScheme);
    }
    if (!user && token) {
      getUser();
    }
  }, [user, settings, mode]);

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<LandingPage user={user} />} />
        <Route path="/map" element={<Map />} />
        <Route path="/search" element={<Search user={user} />} />
        <Route
          path="/forecast/:spotName"
          element={
            <Forecast
              settings={settings}
              setSettings={setSettings}
              mode={mode}
              user={user}
              setUser={setUser}
            />
          }
        />
        <Route path="/info" element={<Info />} />
        <Route path="/sign-up" element={<SignUp user={user} />} />
        <Route path="/sign-in" element={<SignIn login={login} user={user} />} />
        <Route path="/adm-dashboard" element={<Dashboard user={user} />} />
        <Route
          path="/settings"
          element={
            <SettingsPage
              user={user}
              logout={logout}
              settings={settings}
              setSettings={setSettings}
            />
          }
        />
        <Route path="*" element={<LandingPage />} />
      </Routes>
      <NavBar />
    </BrowserRouter>
  );
};

export default App;
