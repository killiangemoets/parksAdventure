import React, { useState, FC, useEffect } from "react";

import Map, {
  Marker,
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
  ViewStateChangeEvent,
} from "react-map-gl";
import { TCoordinatesBox, TLocation } from "../../../types/map";
import InfoIcon, {
  INFO_ICON_TYPE_CLASSES,
} from "../infoIcon/infoIcon.component";
import { InfoPopup } from "./customMap.style";

const MAPBOX_TOKEN = process.env.REACT_APP_MAP_BOX_TOKEN
  ? process.env.REACT_APP_MAP_BOX_TOKEN
  : "";

export enum MAP_TYPE_CLASSES {
  tourItinerary = "tour-itinerary",
  searchTours = "search-tours",
}

type MapCommonProps = {
  locations?: TLocation[];
  geolocationControl?: boolean;
  fullscreenControl?: boolean;
  navigationControl?: boolean;
  handleCoordinatesBox?: (value: TCoordinatesBox) => void;
};

type MapConditionalProps =
  | {
      type?: MAP_TYPE_CLASSES.searchTours;
      mapOpen: boolean;
    }
  | {
      type?: MAP_TYPE_CLASSES.tourItinerary;
      mapOpen?: never;
    };

type ViewStateProps = {
  longitude: number;
  latitude: number;
  zoom: number;
};

const CustomMap: FC<MapCommonProps & MapConditionalProps> = ({
  locations,
  geolocationControl = false,
  fullscreenControl = false,
  navigationControl = false,
  handleCoordinatesBox,
  type = MAP_TYPE_CLASSES.tourItinerary,
  mapOpen,
}) => {
  const [viewState, setViewState] = useState<ViewStateProps>({
    longitude:
      locations && locations.length > 0 ? locations[0].coordinates[0] : 9.8,
    latitude:
      locations && locations.length > 0 ? locations[0].coordinates[1] : 5.6,
    zoom: 0,
  });
  const [pins, setPins] = useState<JSX.Element[]>([]);
  const [popupInfo, setPopupInfo] = useState<TLocation | null>(null);

  useEffect(() => {
    if (!locations) return;
    const updatedPins = locations.map((stop, index) => (
      <Marker
        key={`marker-${index}`}
        longitude={stop.coordinates[0]}
        latitude={stop.coordinates[1]}
        anchor="bottom"
        style={{ cursor: "pointer" }}
        onClick={(e) => {
          // If we let the click event propagates to the map, it will immediately close the popup
          // with `closeOnClick: true`
          e.originalEvent.stopPropagation();
          if (stop.popupContent) setPopupInfo(stop);
        }}
      >
        <InfoIcon
          iconType={
            type === MAP_TYPE_CLASSES.tourItinerary && index === 0
              ? INFO_ICON_TYPE_CLASSES.locationXLGreen
              : INFO_ICON_TYPE_CLASSES.locationXLOrange
          }
        />
      </Marker>
    ));
    setPins(updatedPins);
  }, [locations]);

  useEffect(() => {
    if (type === MAP_TYPE_CLASSES.tourItinerary)
      setViewState({
        longitude:
          locations && locations.length > 0
            ? locations[0].coordinates[0]
            : -100,
        latitude:
          locations && locations.length > 0 ? locations[0].coordinates[1] : 40,
        zoom: 5,
      });
  }, [locations]);

  const handleOnMove = (evt: ViewStateChangeEvent) => {
    if (handleCoordinatesBox) {
      const mapBounds = evt.target.getBounds();
      const northeast = mapBounds.getNorthEast();
      const southwest = mapBounds.getSouthWest();
      console.log(evt, mapBounds);

      handleCoordinatesBox({
        southwest: [southwest.lat, southwest.lng],
        northeast: [northeast.lat, northeast.lng],
      });
    }
  };

  useEffect(() => {
    if (mapOpen)
      setViewState({
        longitude: 0,
        latitude: 0,
        zoom: 0,
      });
  }, [mapOpen]);

  return (
    <Map
      {...viewState}
      onMove={(evt) => {
        setViewState(evt.viewState);
      }}
      onMoveEnd={handleOnMove}
      dragRotate={false}
      mapStyle="mapbox://styles/killiangemoets/clcdpld4j009w14oxa2fmtnvx"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      {geolocationControl && <GeolocateControl position="top-left" />}
      {fullscreenControl && <FullscreenControl position="top-left" />}
      {navigationControl && <NavigationControl position="top-left" />}
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
          {popupInfo.popupContent}
        </InfoPopup>
      )}
    </Map>
  );
};
export default CustomMap;
