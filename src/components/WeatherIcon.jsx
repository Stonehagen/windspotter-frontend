import ClearDay from '../assets/weather/ClearDay.svg?react';
import PartlyCloudyDay from '../assets/weather/PartlyCloudyDay.svg?react';
import MostlyCloudyDay from '../assets/weather/MostlyCloudyDay.svg?react';
import CloudyNight from '../assets/weather/CloudyNight.svg?react';
import Cloudy from '../assets/weather/Cloudy.svg?react';

export default ({ cloudCover, night }) => {
  if (cloudCover <= 0.25) {
    return night ? <CloudyNight /> : <ClearDay />;
  } else if (cloudCover <= 0.5) {
    return night ? <CloudyNight /> : <PartlyCloudyDay />;
  } else if (cloudCover <= 0.75) {
    return night ? <CloudyNight /> : <MostlyCloudyDay />;
  } else {
    return <Cloudy />;
  }
};
