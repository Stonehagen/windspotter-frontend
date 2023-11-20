const MapForecastTimeMenu = ({
  setForecastTime,
  forecastMap,
  setOverlayed,
}) => {
  // get Keys from forecastMap.forecastMaps and sort them by date and map them to buttons
  // the buttons should set the forecastTime and setOverlayed to false
  const forecatTimes = Object.keys(forecastMap.forecastMaps);
  forecatTimes.sort((a, b) => {
    return new Date(a) - new Date(b);
  });

  return (
    <div className="leaflet-bottom leaflet-right">
      {forecatTimes.map((time) => (
        <button
          className="leaflet-control"
          key={time}
          onClick={() => {
            setForecastTime(time);
            setOverlayed(false);
          }}
        >
          {time}
        </button>
      ))}
    </div>
  );
};

export default MapForecastTimeMenu;
