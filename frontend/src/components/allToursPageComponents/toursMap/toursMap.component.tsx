import { FC } from "react";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../UIComponents/button/button.component";
import Map from "../../UIComponents/map/map.component";
import {
  HideMapNote,
  LeftArrowIcon,
  RightArrowIcon,
  ToursMapButtonWrapper,
  ToursMapContainer,
  ToursMapWrapper,
} from "./toursMap.style";

export type ToursMapProps = {
  fix: boolean;
  reduceHeight: boolean;
  handleOpenMap: () => void;
  mapOpen: boolean;
};

const ToursMap: FC<ToursMapProps> = ({
  fix,
  reduceHeight,
  handleOpenMap,
  mapOpen,
}) => {
  const handleClickMap = () => {
    handleOpenMap();
  };
  return (
    <ToursMapContainer fix={fix} reduceHeight={reduceHeight} mapOpen={mapOpen}>
      <ToursMapWrapper>
        <ToursMapButtonWrapper>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.gallery}
            onClick={handleClickMap}
          >
            {mapOpen ? <RightArrowIcon /> : <LeftArrowIcon />}
          </Button>
        </ToursMapButtonWrapper>
        <Map />
        {/* <HideMapNote /> */}
      </ToursMapWrapper>
    </ToursMapContainer>
  );
};

export default ToursMap;
