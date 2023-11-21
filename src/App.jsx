import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import 'maplibre-gl';
import '@maplibre/maplibre-gl-leaflet';


import Forecast from './components/Forecast';
import LandingPage from './components/LandingPage';
import Map from './components/Map';

const App = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/forecast/:spotName" element={<Forecast />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
