import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  AttributionControl,
  LayersControl,
  Marker,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import overlayMap from '../../data/maps/overlayMap.json';
import baseMap from '../../data/maps/baseMap.json';
import { Color } from 'maplibre-gl';

const LatLonPicker = ({ spotLat, setSpotLat, spotLng, setSpotLng }) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null); // [lat, lng
  const [layersControl, setLayersControl] = useState(null);
  const [newPane, setNewPane] = useState(null);

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
    if (map) {
      if (!newPane) {
        setMapLayers();
      }
      map.on('click', (e) => {
        setSpotLat(e.latlng.lat);
        setSpotLng(e.latlng.lng);
      });
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
        <Marker ref={setMarker} position={[spotLat, spotLng]}></Marker>
      </MapContainer>
    </>
  );
};

export default LatLonPicker;
