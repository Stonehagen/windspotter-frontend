import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../styles/App.css';

import Forecast from './components/Forecast';
import LandingPage from './components/LandingPage';

const App = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/forecast/:spotName" element={<Forecast />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
