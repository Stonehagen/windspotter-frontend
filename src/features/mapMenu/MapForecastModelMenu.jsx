const MapForecastModelMenu = ({
  setForecastModel,
  forecastMaps,
  setOverlayed,
  setForecastTime,
}) => {
  return (
    <div className="leaflet-top">
      {forecastMaps.map((map) => (
        <button
          className="leaflet-control"
          key={map.forecastInfo.name}
          onClick={() => {
            setForecastModel(map.forecastInfo.name);
            setForecastTime(null);
            setOverlayed(false);
          }}
        >
          {map.forecastInfo.name}
        </button>
      ))}
    </div>
  );
};

export default MapForecastModelMenu;
