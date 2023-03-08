import { FC, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  ErrorMessage,
  InfoPopup,
  InputWrapper,
  MapContainer,
  PopupButton,
  PopupInputContainer,
} from "./addTourItineraryMap.style";
import Map, {
  Marker,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
  Source,
  Layer,
} from "react-map-gl";

import InfoIcon, {
  INFO_ICON_TYPE_CLASSES,
} from "../../../UIComponents/infoIcon/infoIcon.component";
import GeocoderControl from "../../../../utils/map/geocoder-control";
import { ConfigProvider, Input } from "antd";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../../UIComponents/button/button.component";
import axios from "axios";

const MAPBOX_TOKEN = process.env.REACT_APP_MAP_BOX_TOKEN
  ? process.env.REACT_APP_MAP_BOX_TOKEN
  : "";

export type AddInfoPopupProps = {
  latitude: number;
  longitude: number;
};

const defaultNewStopState: Stop = {
  latitude: 0,
  longitude: 0,
  text: "",
};

export type AddTourItineraryMapProps = {
  stops: Stop[];
  addStop: (stop: Stop) => void;
};

const AddTourItineraryMap: FC<AddTourItineraryMapProps> = ({
  stops,
  addStop,
}) => {
  const [viewState, setViewState] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 3.5,
  });
  const [pins, setPins] = useState<JSX.Element[]>([]);
  const [newStop, setNewStop] = useState<Stop>(defaultNewStopState);
  const [newPin, setNewPin] = useState<JSX.Element | null>(null);

  const [popupInfo, setPopupInfo] = useState<Stop | null>(null);
  const [showPopupAddInfo, setShowPopupAddInfo] = useState<boolean>(false);
  const [showErrorStopText, setShowErrorStopText] = useState<string>("");
  const [itinerary, setItinerary] = useState<[number, number][]>([]);

  useEffect(() => {
    const updatedPins = stops.map((stop, index) => (
      <Marker
        key={`marker-${index}`}
        longitude={stop.longitude}
        latitude={stop.latitude}
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
    const getDirections = async () => {
      if (stops.length < 2) return setItinerary([]);
      try {
        let stopsToString = (
          stops.reduce((acc, stop) => {
            return acc + `${stop.longitude},${stop.latitude};`;
          }, "") + `${stops[0].longitude},${stops[0].latitude};`
        ).slice(0, -1);

        console.log({ stops, stopsToString });
        const directions = await axios(
          `https://api.mapbox.com/directions/v5/mapbox/walking/${stopsToString}?access_token=pk.eyJ1Ijoia2lsbGlhbmdlbW9ldHMiLCJhIjoiY2xjZHIzOTI4MDF6MTNybjBwNXRnZjM1YyJ9.6KlAze9wPLj3rmb2ykhgdQ&geometries=geojson`
        );
        setItinerary(directions.data.routes[0].geometry.coordinates);
      } catch (error) {
        setItinerary([]);
        console.log(error);
      }
    };
    getDirections();
  }, [stops]);

  const handleRenderNewStopInfo = (longitude: number, latitude: number) => {
    setShowErrorStopText("");

    // setViewState({ ...viewState, longitude, latitude });

    const addNewPin = (
      <Marker longitude={longitude} latitude={latitude} anchor="bottom">
        <InfoIcon iconType={INFO_ICON_TYPE_CLASSES.locationXLGrey} />
      </Marker>
    );

    setNewPin(addNewPin);
    setNewStop({ ...newStop, latitude, longitude });
    setShowPopupAddInfo(true);
  };

  const handleChangePopupInputValue = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShowErrorStopText("");
    setNewStop({ ...newStop, text: e.target.value });
  };

  const handleCloseAddPopup = () => {
    setNewStop(defaultNewStopState);
    setShowPopupAddInfo(false);
    setNewPin(null);
  };

  const handleAddStop = () => {
    if (newStop.text.trim().length === 0) {
      setShowErrorStopText("Please add a small description");
    } else if (stops.find((stop) => stop.text === newStop.text)) {
      setShowErrorStopText("The description should be unique");
    } else {
      addStop({ ...newStop, text: newStop.text.trim() });
      setNewStop(defaultNewStopState);
      setShowPopupAddInfo(false);
      setNewPin(null);
    }
  };

  // const dataOne = {
  //   type: "Feature",
  //   properties: {},
  //   geometry: {
  //     type: "LineString",
  // coordinates: [
  //   [-122.41510269913951, 37.77909036739809],
  //   [39.5423, -77.0564],
  // ],
  //   },
  // };

  return (
    <MapContainer>
      <Map
        // initialViewState={{
        //   longitude: -18,
        //   latitude: 35,
        //   zoom: 1,
        // }}
        // ViewState={{ longitude: -18, latitude: 35, zoom: 1 }}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        dragRotate={false}
        mapStyle="mapbox://styles/killiangemoets/clcdpld4j009w14oxa2fmtnvx"
        mapboxAccessToken={MAPBOX_TOKEN}
        onClick={(e) => {
          handleRenderNewStopInfo(e.lngLat.lng, e.lngLat.lat);
        }}
      >
        <Source
          id="polylineLayer"
          type="geojson"
          data={{
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: itinerary,
            },
          }}
        >
          <Layer
            id="lineLayer"
            type="line"
            source="my-data"
            layout={{
              "line-join": "round",
              "line-cap": "round",
            }}
            paint={{
              "line-color": "#cc704b",
              "line-width": 5,
            }}
          />
        </Source>
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />
        {pins}
        {newPin}
        {popupInfo && (
          <InfoPopup
            anchor="bottom"
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            onClose={() => {
              setPopupInfo(null);
            }}
          >
            <div>
              <p>{popupInfo.text}</p>
            </div>
          </InfoPopup>
        )}
        {showPopupAddInfo && (
          <InfoPopup
            anchor="bottom"
            longitude={newStop.longitude}
            latitude={newStop.latitude}
            onClose={handleCloseAddPopup}
            closeOnClick={false}
          >
            <PopupInputContainer error={Boolean(showErrorStopText.length)}>
              <ConfigProvider
                theme={{
                  hashed: false,
                  components: {
                    InputNumber: {
                      colorPrimary: "#cc704b",
                      colorLink: "#cc704b",
                      fontSize: 16,
                      colorText: "#333",
                      colorTextPlaceholder: "#aaa",
                      borderRadiusSM: 999,
                      colorBgContainerDisabled: "rgba(80, 96, 68, 0.1)",
                      colorBgElevated: "#fdfaf5",
                    },
                    DatePicker: {},
                  },
                }}
              >
                <InputWrapper>
                  <Input
                    name={"stop description"}
                    value={newStop.text}
                    onChange={handleChangePopupInputValue}
                    placeholder={"Day 1: Farview Curve Viewpoint"}
                  />
                  <ErrorMessage>{showErrorStopText}</ErrorMessage>
                </InputWrapper>

                <PopupButton>
                  <Button
                    buttonType={BUTTON_TYPE_CLASSES.cancel}
                    onClick={handleCloseAddPopup}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddStop}>Add</Button>
                </PopupButton>
              </ConfigProvider>
            </PopupInputContainer>
          </InfoPopup>
        )}
        <GeocoderControl
          mapboxAccessToken={MAPBOX_TOKEN}
          position="top-right"
          handleLocation={handleRenderNewStopInfo}
        />
      </Map>
    </MapContainer>
  );
};

export default AddTourItineraryMap;
