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

const Map = () => {
  const [map, setMap] = useState(null);
  const [layersControl, setLayersControl] = useState(null);
  const [overlayed, setOverlayed] = useState(false);

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

  const getMap = async (mapId = '65553dfdbba0aad9c5a8a485') => {
    axios
      .get(`${import.meta.env.VITE_API_BACKENDSERVER}/map/${mapId}`)
      .then(async (res) => {
        const header =
          res.data.mapForecast.forecastMaps['Wed, 22 Nov 2023 09:00:00 GMT']
            .data;
        const imageBuffer = await urlToBuffer(
          res.data.mapForecast.forecastMaps['Wed, 22 Nov 2023 09:00:00 GMT']
            .url,
        );
        const { values, windOverlay } = await convertImageToData(
          imageBuffer,
          header,
        );

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

        L.velocityLayer({
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

        setOverlayed(true);
      })
      .catch((err) => console.log(err));
    // need a redirect to main page if an error occurs
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
  }, [map]);

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
      </MapContainer>
    </>
  );
};

export default Map;
