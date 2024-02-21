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
      {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d93836.37935915998!2d23.24154643037173!3d42.69552878954155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa8682cb317bf5%3A0x400a01269bf5e60!2sSofia!5e0!3m2!1sen!2sbg!4v1707920266071!5m2!1sen!2sbg" width="600" height="450" allowfullscreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe> */}
    </div>
  );
};

export default MapComponent;