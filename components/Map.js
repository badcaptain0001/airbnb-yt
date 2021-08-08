import * as React from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";
import { useState } from "react";
import Image from "next/image";

function Map({ searchResult }) {
  const [selectedLocation, setSelectedLocation] = useState({});
  // latitude and longitude
  const coordinates = searchResult.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));
  const center = getCenter(coordinates);
  const [viewport, setViewport] = React.useState({
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });
  return (
    <ReactMapGL
      mapStyle="mapbox://styles/bad-capta1n/cks1zjm6m2r8i17p7t2ox4s7j"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      width="100%"
      height="100%"
      onViewportChange={(nextviewport) => setViewport(nextviewport)}
    >
      {searchResult.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              onClick={() => setSelectedLocation(result)}
              className="cursor-pointer animate-bounce"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
            </p>
          </Marker>
          {selectedLocation.long === result.long ? (
            <Popup
              className="z-50"
              onClose={() => setSelectedLocation({})}
              closeClick={true}
              latitude={result.lat}
              longitude={result.long}
            >
              {result.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
