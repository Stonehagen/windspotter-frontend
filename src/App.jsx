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
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';

const App = () => {
  const [user, setUser] = useState();
  const [mode, setMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light',
  );
  const [settings, setSettings] = useState({
    windUnit: 'kts',
    displayNight: false,
    nightEnd: 7,
    nightStart: 21,
  });
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
      }),
    );
  };

  useEffect(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        const colorScheme = event.matches ? 'dark' : 'light';
        setMode(colorScheme);
      });
    if (!user && token) {
      getUser();
    }
  }, [user]);

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<LandingPage user={user} logout={logout} />} />
        <Route path="/map" element={<Map />} />
        <Route path="/search" element={<Search />} />
        <Route
          path="/forecast/:spotName"
          element={<Forecast settings={settings} setSettings={setSettings} />}
        />
        <Route path="/info" element={<Info />} />
        <Route path="/sign-up" element={<SignUp user={user} />} />
        <Route path="/sign-in" element={<SignIn login={login} user={user} />} />
        <Route path="/adm-dashboard" element={<Dashboard  user={user}/>} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
      <NavBar mode={mode} />
    </BrowserRouter>
  );
};

export default App;
