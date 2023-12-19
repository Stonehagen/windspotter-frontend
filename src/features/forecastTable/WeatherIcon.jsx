import ClearDay from '../../assets/icons/weather/ClearDay.svg?react';
import PartlyCloudyDay from '../../assets/icons/weather/PartlyCloudyDay.svg?react';
import MostlyCloudyDay from '../../assets/icons/weather/MostlyCloudyDay.svg?react';
import CloudyNight from '../../assets/icons/weather/CloudyNight.svg?react';
import Cloudy from '../../assets/icons/weather/Cloudy.svg?react';

export default ({ cloudCover, night }) => {
  if (cloudCover <= 0.25) {
    return night ? (
      <CloudyNight className="WeatherIcon" />
    ) : (
      <ClearDay className="WeatherIcon" />
    );
  } else if (cloudCover <= 0.5) {
    return night ? (
      <CloudyNight className="WeatherIcon" />
    ) : (
      <PartlyCloudyDay className="WeatherIcon" />
    );
  } else if (cloudCover <= 0.75) {
    return night ? (
      <CloudyNight className="WeatherIcon" />
    ) : (
      <MostlyCloudyDay className="WeatherIcon" />
    );
  } else {
    return <Cloudy className="WeatherIcon" />;
  }
};
