import React from 'react';
import { Card } from '../components/ui/card';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const LocationOfAccident = ({ latitude, longitude }) => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = {
    lat: latitude,
    lng: longitude,
  };

  return (
    <div>
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-4">Accident Location</h2>
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={14} // Zoom level to focus on the accident location
          >
            {/* Marker to show the accident location */}
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </Card>
    </div>
  );
};

export default LocationOfAccident;
