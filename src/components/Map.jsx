import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  AttributionControl,
  LayersControl,
  ImageOverlay,
  LayerGroup,
} from 'react-leaflet';
import L from 'leaflet';
import '@maplibre/maplibre-gl-leaflet';
import 'leaflet/dist/leaflet.css';
import mapStyle from '../assets/maps/alidade_smooth-overlay.json'

import image from '../assets/windImg.png';

const Map = () => {
  const [map, setMap] = useState(null);
  const [layersControl, setLayersControl] = useState(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (layersControl && map && !done) {
      map.removeControl(layersControl);

      L.imageOverlay(
        image,
        [
          [58.08, -3.94],
          [43.18, 20.34],
        ],
        { zIndex: 0 },
      ).addTo(map);

      L.maplibreGL({
        style: mapStyle,
        attribution:
          '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/about" target="_blank">OpenStreetMap</a> contributors',
        pane: 'overlayPane',
        zIndex: 1,
      }).addTo(map);
      setDone(true);
    }
    if (map) {
      map.getPanes().mapPane.style.opacity = 0.7;
      console.log(map.getPanes());
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
