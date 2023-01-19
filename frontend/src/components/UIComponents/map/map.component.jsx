import React, { useRef, useEffect, useState } from "react";

import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { MapContainer } from "./map.style";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia2lsbGlhbmdlbW9ldHMiLCJhIjoiY2xkM2ZrcTJuMDFhMzN3bXMwNWEwZ3RlcSJ9.j5VfhZYQRk9zAaY5Nk2HZQ";

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/killiangemoets/clcdpld4j009w14oxa2fmtnvx",
      center: [lng, lat],
      zoom: zoom,
    });
  });
  return <MapContainer ref={mapContainer} />;
};
export default Map;
