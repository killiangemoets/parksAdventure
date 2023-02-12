import { FC } from "react";
import InfoIcon, {
  INFO_ICON_TYPE_CLASSES,
} from "../../UIComponents/infoIcon/infoIcon.component";
import {
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
};

const ItineraryPoint: FC<ItineraryPointProps> = ({
  type = ITINERARY_POINT_TYPE_CLASSES.stopOverPoint,
  name,
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
    </PointContainer>
  );
};

export default ItineraryPoint;
