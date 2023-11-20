const MapForecastModelMenu = ({ setForecastModel, forecastMaps, setOverlayed }) => {
  return (
    <div className="leaflet-top leaflet-right">
      {forecastMaps.map((map) => (
        <button
          className="leaflet-control"
          key={map.forecastInfo.name}
          onClick={() => {
            setForecastModel(map.forecastInfo.name);
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
