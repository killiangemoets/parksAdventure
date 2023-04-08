import { time } from "console";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { selectTours } from "../../../store/tours/tours.selector";
import { TCoordinatesBox, TLocation } from "../../../types/map";
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

export type ToursMapProps = {
  handleOpenMap: () => void;
  mapOpen: boolean;
};

const ToursMap: FC<ToursMapProps> = ({ handleOpenMap, mapOpen }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tours = useSelector(selectTours);
  const [markers, setMarkers] = useState<TLocation[]>([]);
  const [timeout, setTimout] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (mapOpen) {
      searchParams.set("box", "90,180to-90,-180");
    } else {
      searchParams.delete("box");
    }
    setSearchParams(searchParams);
  }, [mapOpen]);

  useEffect(() => {
    if (!tours || !mapOpen) return setMarkers([]);
    const newMarkers = tours.map((tour) => {
      return {
        coordinates: tour.startLocation.coordinates,
        popupContent: <TourPopup tour={tour} />,
      };
    });
    setMarkers(newMarkers);
  }, [tours, mapOpen]);

  const handleClickMap = () => {
    handleOpenMap();
  };

  const handleCoordinatesBox = (coordinatesBox: TCoordinatesBox) => {
    if (!mapOpen) return;
    console.log(timeout);
    timeout && window.clearTimeout(timeout);
    const newTimeout = window.setTimeout(() => {
      searchParams.set(
        "box",
        `${coordinatesBox.southwest[0]},${coordinatesBox.southwest[1]}to${coordinatesBox.northeast[0]},${coordinatesBox.northeast[1]}`
      );
      setSearchParams(searchParams);
    }, 2000);

    setTimout(newTimeout);
  };

  return (
    <ToursMapContainer mapOpen={mapOpen}>
      <ToursMapWrapper>
        <ToursMapButtonWrapper>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.gallery}
            onClick={handleClickMap}
          >
            {mapOpen ? <RightArrowIcon /> : <LeftArrowIcon />}
          </Button>
        </ToursMapButtonWrapper>
        <CustomMap
          locations={markers}
          handleCoordinatesBox={handleCoordinatesBox}
          type={MAP_TYPE_CLASSES.searchTours}
          mapOpen={mapOpen}
        />
      </ToursMapWrapper>
    </ToursMapContainer>
  );
};

export default ToursMap;
