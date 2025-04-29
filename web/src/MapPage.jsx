import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet';
import { fetchNearbyStores } from './api';

function StoreFetcher({ onUpdate }) {
  const map = useMapEvent('moveend', () => {
    const center = map.getCenter();
    const radius = map.getBounds().getNorthEast().distanceTo(center) | 0; 
    // roughly the “radius” in meters from center → NE corner
    onUpdate({ lat: center.lat, lon: center.lng, radius });
  });
  return null;
}

export default function MapPage() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    // initial fetch centered on Seattle
    fetchNearbyStores({ lat: 47.6062, lon: -122.3321, radius: 10000 })
      .then(setStores)
      .catch(console.error);
  }, []);

  return (
    <MapContainer
      center={[47.6062, -122.3321]}
      zoom={12}
      style={{ height: '100vh', width: '100vw' }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <StoreFetcher onUpdate={({lat,lon,radius}) => {
        fetchNearbyStores({ lat, lon, radius }).then(setStores);
      }} />
      {stores.map(s => (
        <Marker key={s.place_id} position={[s.lat, s.lon]}>
          <Popup>
            <strong>{s.name}</strong><br/>
            {s.vicinity}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
