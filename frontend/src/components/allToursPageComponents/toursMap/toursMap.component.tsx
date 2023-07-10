import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { selectTours } from "../../../store/tours/tours.selector";
import { TCoordinatesBox, TLocation, TViewState } from "../../../types/map";
import compareObjects from "../../../utils/comparison/compareObjects";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../UIComponents/button/button.component";
import CustomMap, {
  MAP_TYPE_CLASSES,
} from "../../UIComponents/customMap/customMap.component";
import TourPopup from "../../UIComponents/tourPopup/tourPopup.component";
import {
  LeftArrowIcon,
  RightArrowIcon,
  ToursMapButtonWrapper,
  ToursMapContainer,
  ToursMapWrapper,
} from "./toursMap.style";

export type ToursMapProps = { highlightMarker: string | undefined } & (
  | {
      handleOpenMap: () => void;
      mapOpen: boolean;
      fullMap?: never;
    }
  | {
      handleOpenMap?: never;
      mapOpen?: never;
      fullMap: boolean;
    }
);

const ToursMap: FC<ToursMapProps> = ({
  handleOpenMap,
  mapOpen = false,
  highlightMarker,
  fullMap = false,
}) => {
  if (fullMap) mapOpen = true;
  const [searchParams, setSearchParams] = useSearchParams();
  const tours = useSelector(selectTours);
  const [markers, setMarkers] = useState<TLocation[]>([]);
  const [timeout, setTimout] = useState<number | undefined>(undefined);
  const [initialViewState, setinitialViewState] = useState<TViewState>({
    longitude: 0,
    latitude: 0,
    zoom: 0,
  });

  useEffect(() => {
    if (!mapOpen) {
      searchParams.delete("box");
      searchParams.delete("viewstate");
    }
    // searchParams.delete("page"); // side effect: it deletes the page parameter when
    // we reload the page!
    setSearchParams(searchParams);
  }, [mapOpen]);

  useEffect(() => {
    if (!tours || !mapOpen) return setMarkers([]);
    const newMarkers = tours.map((tour) => {
      return {
        coordinates: tour.startLocation.coordinates,
        highlight: highlightMarker === tour._id,
        popupContent: <TourPopup tour={tour} />,
      };
    });
    setMarkers(newMarkers);
  }, [tours, mapOpen, highlightMarker]);

  useEffect(() => {
    const initialViewStateArr = searchParams.get("viewstate")?.split(",");
    if (!initialViewStateArr) {
      setinitialViewState({
        longitude: 0,
        latitude: 0,
        zoom: 0,
      });
      return;
    }
    const newInitialViewState: TViewState = {
      latitude: +initialViewStateArr[0],
      longitude: +initialViewStateArr[1],
      zoom: +initialViewStateArr[2].replace("zoom", ""),
    };
    if (!compareObjects(newInitialViewState, initialViewState))
      setinitialViewState(newInitialViewState);
  }, [searchParams]);

  const handleClickMap = () => {
    handleOpenMap && handleOpenMap();
  };

  const handleCoordinatesBox = (
    coordinatesBox: TCoordinatesBox,
    viewState: TViewState
  ) => {
    if (!mapOpen) return;
    timeout && window.clearTimeout(timeout);
    const newTimeout = window.setTimeout(() => {
      searchParams.set(
        "box",
        `${coordinatesBox.southwest[0]},${coordinatesBox.southwest[1]}to${coordinatesBox.northeast[0]},${coordinatesBox.northeast[1]}`
      );
      searchParams.set(
        "viewstate",
        `${viewState.latitude},${viewState.longitude},${viewState.zoom}zoom`
      );
      searchParams.delete("page");
      setSearchParams(searchParams);
    }, 2000);

    setTimout(newTimeout);
  };

  return (
    <ToursMapContainer mapOpen={mapOpen} fullMap={fullMap}>
      <ToursMapWrapper>
        {!fullMap && (
          <ToursMapButtonWrapper>
            <Button
              buttonType={BUTTON_TYPE_CLASSES.gallery}
              onClick={handleClickMap}>
              {mapOpen ? <RightArrowIcon /> : <LeftArrowIcon />}
            </Button>
          </ToursMapButtonWrapper>
        )}
        <CustomMap
          locations={markers}
          handleCoordinatesBox={handleCoordinatesBox}
          type={MAP_TYPE_CLASSES.searchTours}
          mapOpen={mapOpen}
          initialViewState={initialViewState}
        />
      </ToursMapWrapper>
    </ToursMapContainer>
  );
};

export default ToursMap;
