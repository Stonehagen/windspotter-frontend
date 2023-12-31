import React, { useEffect, useState } from 'react';
import { MapContainer, AttributionControl, LayersControl } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../utils/wind/js/L.Control.Velocity.js';
import '../utils/wind/js/L.VelocityLayer.js';
import '../utils/wind/js/L.CanvasLayer.js';
import '../utils/wind/css/leaflet-wind.css';
import '../assets/styles/Map.css';
import { useConvertImageToData } from '../hooks/useConvertImageToData.js';

import overlayMap from '../data/maps/overlayMap.json';
import baseMap from '../data/maps/baseMap.json';
import MapForecastModelMenu from '../features/mapMenu/MapForecastModelMenu.jsx';
import MapForecastTimeMenu from '../features/mapMenu/MapForecastTimeMenu.jsx';

const Map = () => {
  const [forecastModel, setForecastModel] = useState('icon-d2');
  const [forecastMaps, setForecastMaps] = useState([]);
  const [map, setMap] = useState(null);
  const [layersControl, setLayersControl] = useState(null);
  const [overlayed, setOverlayed] = useState(false);
  const [windSpeedLayer, setWindSpeedLayer] = useState(null);
  const [velocityOverlay, setVelocityOverlay] = useState(null);
  const [forecastTime, setForecastTime] = useState(null);
  const [newPane, setNewPane] = useState(null);

  const getForecastTime = (maps) => {
    // sort Dates and pick the oldest one
    return Object.keys(maps)
      .filter((time) => {
        const dateToday = new Date().setHours(0, 0, 0, 0);
        const dateForecast = new Date(time).setHours(0, 0, 0, 0);
        return dateForecast >= dateToday;
      })
      .sort((a, b) => {
        return new Date(a) - new Date(b);
      })[0];
  };

  const urlToBuffer = async (url) => {
    return axios({
      method: 'get',
      url: url,
      responseType: 'arraybuffer',
    }).then((res) => {
      return res.data;
    });
  };

  const getMap = async () => {
    let mapForecasts;
    if (forecastMaps.length === 0) {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BACKENDSERVER}/map/`,
      );
      mapForecasts = res.data.mapForecasts;
      // iterater over the mapForecasts and over the forecastMaps and remove every map that is older than today
      const today = new Date().setHours(0, 0, 0, 0);
      for (const mapForecast of mapForecasts) {
        for (const forecastTime in mapForecast.forecastMaps) {
          const dateForecast = new Date(forecastTime).setHours(0, 0, 0, 0);
          if (dateForecast < today) {
            delete mapForecast.forecastMaps[forecastTime];
          }
        }
      }
      setForecastMaps(mapForecasts);
    } else {
      mapForecasts = forecastMaps;
    }

    const currentMap = mapForecasts.find(
      (map) => map.forecastInfo.name === forecastModel,
    );

    const forecastDate = forecastTime
      ? forecastTime
      : getForecastTime(currentMap.forecastMaps);

    const header = currentMap.forecastMaps[forecastDate].data;
    const imageBuffer = await urlToBuffer(
      currentMap.forecastMaps[forecastDate].url.replace('http://', 'https://'),
    );
    const { values, windOverlay } = await useConvertImageToData(
      imageBuffer,
      header,
    );

    velocityOverlay ? velocityOverlay.remove() : null;

    const overlay = L.imageOverlay(
      windOverlay,
      [
        [header.la2, header.lo1 > 180 ? header.lo1 - 360 : header.lo1],
        [header.la1, header.lo2 > 180 ? header.lo2 - 360 : header.lo2],
      ],
      { zIndex: 5, opacity: 0.97 },
    ).addTo(map);

    const overlayElement = overlay.getElement();
    overlayElement.style.mixBlendMode = 'multiply';
    setWindSpeedLayer(overlayElement);

    windSpeedLayer ? windSpeedLayer.remove() : null;
    const veloOverlay = L.velocityLayer({
      displayValues: true,
      displayOptions: {
        velocityType: 'Wind',
        position: 'bottomleft',
        emptyString: 'No wind data',
        speedUnit: 'kt',
      },
      data: { json: { header }, values },
      maxVelocity: 30,
    }).addTo(map);

    setVelocityOverlay(veloOverlay);
    setOverlayed(true);
    setForecastTime(forecastDate);
  };

  const setMapLayers = () => {
    map.removeControl(layersControl);

    const newPane = map.createPane('newPane');
    newPane.style.zIndex = 1000;

    L.maplibreGL({
      style: baseMap,
      attribution:
        '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/about" target="_blank">OpenStreetMap</a> contributors',
      pane: 'overlayPane',
      zIndex: 0,
    }).addTo(map);

    L.maplibreGL({
      style: overlayMap,
      attribution:
        '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/about" target="_blank">OpenStreetMap</a> contributors',
      pane: 'newPane',
    }).addTo(map);

    setNewPane(newPane);
  };

  useEffect(() => {
    if (map && !overlayed) {
      getMap();
      if (!newPane) {
        setMapLayers();
      }
    }
  }, [map, forecastModel, forecastTime]);

  return (
    <>
      <MapContainer
        id="map"
        center={[54, 10]}
        zoom={7}
        scrollWheelZoom={true}
        attributionControl={false}
        ref={setMap}
        zoomControl={false}
      >
        <LayersControl ref={setLayersControl}></LayersControl>
        <AttributionControl position="bottomright" prefix="" />
        {forecastMaps.length > 0 ? (
          <>
            <MapForecastModelMenu
              setForecastModel={setForecastModel}
              forecastMaps={forecastMaps}
              setOverlayed={setOverlayed}
              setForecastTime={setForecastTime}
            />
            {forecastTime ? (
              <MapForecastTimeMenu
                setForecastTime={setForecastTime}
                forecastTime={forecastTime}
                forecastMap={forecastMaps.find(
                  (map) => map.forecastInfo.name === forecastModel,
                )}
                setOverlayed={setOverlayed}
                forecastModel={forecastModel}
              />
            ) : null}
          </>
        ) : null}
      </MapContainer>
    </>
  );
};

export default Map;
