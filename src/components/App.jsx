import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../styles/App.css';

import Forecast from './Forecast';

const App = () => {
  return (
    <BrowserRouter basename="/">
      <p>Hello Windspotter</p>
      <Routes>
        <Route
          path="/forecast/:spotName"
          element={<Forecast />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
