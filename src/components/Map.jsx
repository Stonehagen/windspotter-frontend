import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  AttributionControl,
  LayerGroup,
  LayersControl,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import WindLayer from './WindLayer';
import jsonData from '../assets/wind-global.json';
import L from 'leaflet';

const Map = () => {
  const [map, setMap] = useState(null);
  const [layersControl, setLayersControl] = useState(null);

  useEffect(() => {
    if (layersControl && map) {
      map.removeControl(layersControl);
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
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LayersControl ref={setLayersControl}>
          <LayersControl.BaseLayer checked name="Wind">
            <WindLayer
              displayValues={false}
              displayOptions={{
                velocityType: 'GBR Wind',
                displayPosition: 'bottomright',
                displayEmptyString: 'No wind data',
              }}
              data={jsonData}
              maxVlocity={15}
              minVelocity={0}
              opacity={0.97}
              colorScale={['#ffffff']}
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        <AttributionControl position="bottomright" prefix="" />
      </MapContainer>
    </>
  );
};

export default Map;
