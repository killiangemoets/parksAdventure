import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import mapboxgl, { LngLat } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { createRoot } from "react-dom/client";

import { MapContainer } from "./addTourItineraryMap.style";
import InfoIcon, {
  INFO_ICON_TYPE_CLASSES,
} from "../../../UIComponents/infoIcon/infoIcon.component";

mapboxgl.accessToken = process.env.REACT_APP_MAP_BOX_TOKEN
  ? process.env.REACT_APP_MAP_BOX_TOKEN
  : "";

export type StopProps = {
  latitude: number;
  longitude: number;
  text: string;
};

const Marker = () => {
  const onClick = () => {
    console.log("click on marker");
  };

  return (
    <div onClick={onClick}>
      <InfoIcon iconType={INFO_ICON_TYPE_CLASSES.locationBigOrange} />
    </div>
  );
};

const AddTourItineraryMapDraft = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState<number>(-70.9);
  const [lat, setLat] = useState<number>(42.35);
  const [zoom, setZoom] = useState<number>(9);
  const [stops, setStops] = useState<StopProps[]>([]);
  const markerRef = useRef<HTMLDivElement[]>([]);

  const addMarker = (mapEl: mapboxgl.Map, lngLat: LngLat) => {
    markerRef.current.push(document.createElement("div"));
    const root = createRoot(markerRef.current[markerRef.current.length - 1]);
    root.render(<Marker />);
    console.log(markerRef);

    new mapboxgl.Marker(markerRef.current[markerRef.current.length - 1])
      .setLngLat(lngLat)
      .addTo(mapEl);
  };

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current ? mapContainer.current : "",
      style: "mapbox://styles/killiangemoets/clcdpld4j009w14oxa2fmtnvx",
      center: [lng, lat],
      zoom: zoom,
    });
  }, []);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      const newLng = map.current?.getCenter().lng.toFixed(4);
      const newLat = map.current?.getCenter().lat.toFixed(4);
      const newZoom = map.current?.getZoom().toFixed(2);
      if (newLng) setLng(+newLng);
      if (newLat) setLat(+newLat);
      if (newZoom) setZoom(+newZoom);
    });

    map.current.on("click", (event) => {
      if (!map.current) return;
      // console.log(event.lngLat);

      addMarker(map.current, event.lngLat);
    });
  }, []);

  return (
    <>
      <div>
        Longitude: {lng}, Latitude: {lat}, Zoom: {zoom}
      </div>
      <MapContainer ref={mapContainer} />
    </>
  );
};
export default AddTourItineraryMapDraft;
