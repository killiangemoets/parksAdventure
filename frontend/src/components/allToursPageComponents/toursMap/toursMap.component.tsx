import { FC } from "react";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../UIComponents/button/button.component";
import CustomMap from "../../UIComponents/customMap/customMap.component";
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
    <ToursMapContainer
      fix={fix}
      reduceHeight={reduceHeight}
      mapOpen={mapOpen}
      // className="search-map"
    >
      <ToursMapWrapper>
        <ToursMapButtonWrapper>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.gallery}
            onClick={handleClickMap}
          >
            {mapOpen ? <RightArrowIcon /> : <LeftArrowIcon />}
          </Button>
        </ToursMapButtonWrapper>
        <CustomMap />
        {/* <HideMapNote /> */}
      </ToursMapWrapper>
    </ToursMapContainer>
  );
};

export default ToursMap;
