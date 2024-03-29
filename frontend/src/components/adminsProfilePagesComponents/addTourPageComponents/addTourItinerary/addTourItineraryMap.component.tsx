import { FC, useEffect, useState } from "react";
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
} from "react-map-gl";

import InfoIcon, {
  INFO_ICON_TYPE_CLASSES,
} from "../../../UIComponents/infoIcon/infoIcon.component";
import GeocoderControl from "../../../../utils/map/geocoder-control";
import { ConfigProvider, Input } from "antd";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../../UIComponents/button/button.component";
import { TCreateStop } from "../../../../types/tour";
import colors from "../../../../colors";

const MAPBOX_TOKEN = process.env.REACT_APP_MAP_BOX_TOKEN
  ? process.env.REACT_APP_MAP_BOX_TOKEN
  : "";

export type AddInfoPopupProps = {
  latitude: number;
  longitude: number;
};

const defaultNewStopState: TCreateStop = {
  latitude: 0,
  longitude: 0,
  text: "",
};

export type AddTourItineraryMapProps = {
  stops: TCreateStop[];
  addStop: (stop: TCreateStop) => void;
};

const AddTourItineraryMap: FC<AddTourItineraryMapProps> = ({
  stops,
  addStop,
}) => {
  const [viewState, setViewState] = useState({
    longitude: 0,
    latitude: 0,
    zoom: 0,
  });
  const [pins, setPins] = useState<JSX.Element[]>([]);
  const [newStop, setNewStop] = useState<TCreateStop>(defaultNewStopState);
  const [newPin, setNewPin] = useState<JSX.Element | null>(null);

  const [popupInfo, setPopupInfo] = useState<TCreateStop | null>(null);
  const [showPopupAddInfo, setShowPopupAddInfo] = useState<boolean>(false);
  const [showErrorStopText, setShowErrorStopText] = useState<string>("");

  useEffect(() => {
    const updatedPins = stops.map((stop, index) => (
      <Marker
        key={`marker-${index}`}
        longitude={stop.longitude}
        latitude={stop.latitude}
        anchor="bottom"
        onClick={(e) => {
          // If we let the click event propagates to the map, it will immediately close the popup
          e.originalEvent.stopPropagation();
          setPopupInfo(stop);
        }}>
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
    if (!stops.length) return;
    setViewState({
      longitude: stops[0].longitude,
      latitude: stops[0].latitude,
      zoom: 9,
    });
  }, [stops]);

  const handleRenderNewStopInfo = (longitude: number, latitude: number) => {
    setShowErrorStopText("");

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

  return (
    <MapContainer>
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        dragRotate={false}
        mapStyle="mapbox://styles/killiangemoets/clcdpld4j009w14oxa2fmtnvx"
        mapboxAccessToken={MAPBOX_TOKEN}
        onClick={(e) => {
          handleRenderNewStopInfo(e.lngLat.lng, e.lngLat.lat);
        }}>
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
            }}>
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
            closeOnClick={false}>
            <PopupInputContainer error={Boolean(showErrorStopText.length)}>
              <ConfigProvider
                theme={{
                  hashed: false,
                  components: {
                    InputNumber: {
                      colorPrimary: colors.primary,
                      colorLink: colors.primary,
                      fontSize: 16,
                      colorText: colors.darkGrey,
                      colorTextPlaceholder: colors.grey,
                      borderRadiusSM: 999,
                      colorBgContainerDisabled: "rgba(80, 96, 68, 0.1)",
                      colorBgElevated: colors.background,
                    },
                    DatePicker: {},
                  },
                }}>
                <InputWrapper>
                  <Input
                    name={"stop description"}
                    value={newStop.text}
                    onChange={handleChangePopupInputValue}
                    placeholder={"Day 1: Farview Curve"}
                    maxLength={80}
                  />
                  <ErrorMessage>{showErrorStopText}</ErrorMessage>
                </InputWrapper>

                <PopupButton>
                  <Button
                    buttonType={BUTTON_TYPE_CLASSES.cancel}
                    onClick={handleCloseAddPopup}>
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
