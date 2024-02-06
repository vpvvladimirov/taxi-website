import './map.css';
import React, { useEffect } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import { useGeographic } from 'ol/proj';

const MapComponent = () => {
  useGeographic();

  useEffect(() => {
    const map = new Map({
      target: 'map',
      layers: [new TileLayer({ source: new OSM() })],
      view: new View({
        center: [23.315, 42.695],
        zoom: 14,
      }),
    });

    map.on('error', (event) => {
      console.error(event.error.message);
    });

    return () => {
      map.setTarget(null);
    };
  }, []);

  return (
    <div id='map-container'>
      <div id="map" />
    </div>
  );
};

export default MapComponent;