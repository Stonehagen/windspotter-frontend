import React, { useEffect, useState } from 'react';
import { MapContainer, AttributionControl, LayersControl } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import '@maplibre/maplibre-gl-leaflet';
import 'leaflet/dist/leaflet.css';
import '../wind/js/L.Control.Velocity.js';
import '../wind/js/L.VelocityLayer.js';
import '../wind/js/L.CanvasLayer.js';
import '../wind/css/leaflet-wind.css';

import { setAxiosHeader } from '../methods/setAxiosHeader';
import convertImageToData from '../methods/convertImageToData.js';

import overlayMap from '../assets/maps/overlayMap.json';
import baseMap from '../assets/maps/baseMap.json';
import MapForecastModelMenu from './MapForecastModelMenu.jsx';
import MapForecastTimeMenu from './MapForecastTimeMenu.jsx';

const Map = () => {
  const [forecastModel, setForecastModel] = useState('icon-d2');
  const [forecastMaps, setForecastMaps] = useState([]);
  const [map, setMap] = useState(null);
  const [layersControl, setLayersControl] = useState(null);
  const [overlayed, setOverlayed] = useState(false);
  const [windSpeedLayer, setWindSpeedLayer] = useState(null);
  const [velocityOverlay, setVelocityOverlay] = useState(null);
  const [forecastTime, setForecastTime] = useState(
    'Wed, 22 Nov 2023 09:00:00 GMT',
  );

  setAxiosHeader();

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
      setForecastMaps(res.data.mapForecasts);
    } else {
      mapForecasts = forecastMaps;
    }

    const currentMap = mapForecasts.find(
      (map) => map.forecastInfo.name === forecastModel,
    );
    const header = currentMap.forecastMaps[forecastTime].data;
    const imageBuffer = await urlToBuffer(
      currentMap.forecastMaps[forecastTime].url,
    );
    const { values, windOverlay } = await convertImageToData(
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
      { zIndex: 1, opacity: 1 },
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
      maxVelocity: 20,
    }).addTo(map);

    setVelocityOverlay(veloOverlay);
    setOverlayed(true);
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
  };

  useEffect(() => {
    if (map && !overlayed) {
      getMap();
      setMapLayers();
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
            />
            <MapForecastTimeMenu
              setForecastTime={setForecastTime}
              forecastMap={forecastMaps.find(
                (map) => map.forecastInfo.name === forecastModel,
              )}
              setOverlayed={setOverlayed}
            />
          </>
        ) : null}
      </MapContainer>
    </>
  );
};

export default Map;