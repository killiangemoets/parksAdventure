import React, { useRef, useEffect, useState } from "react";
// import process from "process";

import mapboxgl from "mapbox-gl";
import { MapContainer } from "./map.style";

mapboxgl.accessToken = process.env.REACT_APP_MAP_BOX_TOKEN
  ? process.env.REACT_APP_MAP_BOX_TOKEN
  : "";

const Map = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState<number>(-70.9);
  const [lat, setLat] = useState<number>(42.35);
  const [zoom, setZoom] = useState<number>(9);
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current ? mapContainer.current : "",
      style: "mapbox://styles/killiangemoets/clcdpld4j009w14oxa2fmtnvx",
      center: [lng, lat],
      zoom: zoom,
    });
  });
  return <MapContainer ref={mapContainer} />;
};
export default Map;
