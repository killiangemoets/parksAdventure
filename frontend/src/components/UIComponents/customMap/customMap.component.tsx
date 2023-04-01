import React, { useState, FC, useEffect } from "react";

import Map, {
  Marker,
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl";
import { TStop } from "../../../types/tour";
import InfoIcon, {
  INFO_ICON_TYPE_CLASSES,
} from "../infoIcon/infoIcon.component";
import { InfoPopup } from "./customMap.style";

const MAPBOX_TOKEN = process.env.REACT_APP_MAP_BOX_TOKEN
  ? process.env.REACT_APP_MAP_BOX_TOKEN
  : "";

type MapProps = {
  stops?: TStop[];
};

const CustomMap: FC<MapProps> = ({ stops }) => {
  const [viewState, setViewState] = useState({
    longitude: stops && stops.length > 0 ? stops[0].coordinates[0] : -100,
    latitude: stops && stops.length > 0 ? stops[0].coordinates[1] : 40,
    zoom: 5,
  });
  const [pins, setPins] = useState<JSX.Element[]>([]);
  const [popupInfo, setPopupInfo] = useState<TStop | null>(null);

  useEffect(() => {
    if (!stops) return;
    const updatedPins = stops.map((stop, index) => (
      <Marker
        key={`marker-${index}`}
        longitude={stop.coordinates[0]}
        latitude={stop.coordinates[1]}
        anchor="bottom"
        onClick={(e) => {
          // If we let the click event propagates to the map, it will immediately close the popup
          // with `closeOnClick: true`
          e.originalEvent.stopPropagation();
          setPopupInfo(stop);
        }}
      >
        <InfoIcon
          iconType={
            index
              ? INFO_ICON_TYPE_CLASSES.locationXLOrange
              : INFO_ICON_TYPE_CLASSES.locationXLGreen
          }
        />
      </Marker>
    ));
    setPins(updatedPins);
  }, [stops]);

  useEffect(() => {
    setViewState({
      longitude: stops && stops.length > 0 ? stops[0].coordinates[0] : -100,
      latitude: stops && stops.length > 0 ? stops[0].coordinates[1] : 40,
      zoom: 5,
    });
  }, [stops]);

  return (
    <Map
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      dragRotate={false}
      mapStyle="mapbox://styles/killiangemoets/clcdpld4j009w14oxa2fmtnvx"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      <GeolocateControl position="top-left" />
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      {pins}
      {popupInfo && (
        <InfoPopup
          anchor="bottom"
          longitude={Number(popupInfo.coordinates[0])}
          latitude={Number(popupInfo.coordinates[1])}
          onClose={() => {
            setPopupInfo(null);
          }}
        >
          <div>
            <p>{popupInfo.description}</p>
          </div>
        </InfoPopup>
      )}
    </Map>
  );
};
export default CustomMap;
