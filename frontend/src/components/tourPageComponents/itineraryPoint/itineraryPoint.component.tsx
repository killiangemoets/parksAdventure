import { FC } from "react";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../UIComponents/button/button.component";
import InfoIcon, {
  INFO_ICON_TYPE_CLASSES,
} from "../../UIComponents/infoIcon/infoIcon.component";
import {
  CloseIcon,
  PointContainer,
  PointName,
  StartPointName,
} from "./itineraryPoint.style";

export enum ITINERARY_POINT_TYPE_CLASSES {
  startingPoint = "startingPoint",
  stopOverPoint = "stopOverPoint",
}

export type ItineraryPointProps = {
  type?: ITINERARY_POINT_TYPE_CLASSES;
  name: string;
  edit?: boolean;
};

const ItineraryPoint: FC<ItineraryPointProps> = ({
  type = ITINERARY_POINT_TYPE_CLASSES.stopOverPoint,
  name,
  edit = false,
}) => {
  return (
    <PointContainer>
      <InfoIcon
        iconType={
          type === ITINERARY_POINT_TYPE_CLASSES.startingPoint
            ? INFO_ICON_TYPE_CLASSES.locationBigGreen
            : INFO_ICON_TYPE_CLASSES.locationBigOrange
        }
      />
      {type === ITINERARY_POINT_TYPE_CLASSES.startingPoint ? (
        <StartPointName>{name}</StartPointName>
      ) : (
        <PointName>{name}</PointName>
      )}
      <Button
        buttonType={BUTTON_TYPE_CLASSES.empty}
        // onClick={() => handleClose()}
      >
        <CloseIcon />
      </Button>
    </PointContainer>
  );
};

export default ItineraryPoint;
