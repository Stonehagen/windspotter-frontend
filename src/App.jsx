import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

const App = () => {
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

  setAxiosHeader();

  useEffect(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        const colorScheme = event.matches ? 'dark' : 'light';
        setMode(colorScheme);
      });
  }, []);

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/map" element={<Map />} />
        <Route path="/search" element={<Search />} />
        <Route
          path="/forecast/:spotName"
          element={<Forecast settings={settings} setSettings={setSettings} />}
        />
        <Route path="/info" element={<Info />} />
      </Routes>
      <NavBar mode={mode} />
    </BrowserRouter>
  );
};

export default App;
