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
import EmailVerification from './pages/EmailVerification';
import ResetPassword from './pages/ResetPassword';
import SetPassword from './pages/SetPassword';

const App = () => {
  const [mode, setMode] = useState(null);
  const [user, setUser] = useState();
  const [settings, setSettings] = useState(
    localStorage.getItem('settings')
      ? JSON.parse(localStorage.getItem('settings'))
      : {
          windUnit: 'kts',
          displayNight: false,
          nightEnd: 7,
          nightStart: 21,
          mode: 'light',
        },
  );
  const [prefersColorScheme, setPrefersColorScheme] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light',
  );
  const [path, setPath] = useState(window.location.pathname);
  const [cookies, , setCookie, removeCookie] = useCookies(['jwt_token']);

  const token = getAuthToken(cookies);

  const updateSettings = (settings) => {
    setSettings(settings);
    localStorage.setItem('settings', JSON.stringify(settings));
    if (user) {
      axios
        .put(
          `${import.meta.env.VITE_API_BACKENDSERVER}/user/updateSettings`,
          settings,
        )
        .catch((err) => console.log(err));
    }
  };

  if (token) {
    setAuthToken(token);
  }

  setAxiosHeader();

  const login = (user) => {
    setUser({
      id: user._id,
      username: user.username,
      email: user.email,
      memberStatus: user.memberStatus,
      windUnits: user.windUnits,
      favorites: user.favorites,
      colorMode: user.colorMode,
    });
    setSettings({
      ...settings,
      windUnits,
      mode: colorMode,
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
        username: res.data.username,
        memberStatus: res.data.memberStatus,
        favorites: res.data.favorites,
        windUnits: res.data.windUnits,
        colorMode: res.data.colorMode,
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
        <Route
          path="/"
          element={<LandingPage user={user} setPath={setPath} />}
        />
        <Route path="/map" element={<Map />} />
        <Route
          path="/search"
          element={<Search user={user} setPath={setPath} />}
        />
        <Route
          path="/forecast/:spotName"
          element={
            <Forecast
              settings={settings}
              updateSettings={updateSettings}
              mode={mode}
              user={user}
              setUser={setUser}
            />
          }
        />
        <Route path="/info" element={<Info />} />
        <Route path="/sign-up" element={<SignUp user={user} />} />
        <Route
          path="/sign-in"
          element={
            <SignIn
              login={login}
              user={user}
              cookies={cookies}
              setCookie={setCookie}
            />
          }
        />
        <Route path="/adm-dashboard" element={<Dashboard user={user} />} />
        <Route
          path="/settings"
          element={
            <SettingsPage
              user={user}
              logout={logout}
              settings={settings}
              setSettings={setSettings}
              updateSettings={updateSettings}
              setPath={setPath}
            />
          }
        />
        <Route path="/verify/:token" element={<EmailVerification />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-password/:token" element={<SetPassword />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
      <NavBar path={path} setPath={setPath} />
    </BrowserRouter>
  );
};

export default App;
