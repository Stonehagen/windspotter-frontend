
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import 'maplibre-gl';
import '@maplibre/maplibre-gl-leaflet';

import Forecast from './components/Forecast';
import LandingPage from './components/LandingPage';
import Map from './components/Map';
import NavBar from './components/NavBar';
import Search from './components/Search';

const App = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/map" element={<Map />} />
        <Route path="/search" element={<Search />} />
        <Route path="/forecast/:spotName" element={<Forecast />} />
      </Routes>
      <NavBar />
    </BrowserRouter>
  );
};

export default App;
