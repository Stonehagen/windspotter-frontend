import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import 'maplibre-gl';
import '@maplibre/maplibre-gl-leaflet';

import Forecast from './components/Forecast';
import LandingPage from './components/LandingPage';
import Map from './components/Map';
import NavBar from './components/NavBar';
import Search from './components/Search';
import Info from './components/Info';

const App = () => {
  const [mode, setMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  );

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
        <Route path="/forecast/:spotName" element={<Forecast />} />
        <Route path="/info" element={<Info />} />
      </Routes>
      <NavBar mode={mode}/>
    </BrowserRouter>
  );
};

export default App;
