import InfoIcon, {
  ICON_TYPE_CLASSES,
} from "../../UIComponents/infoIcon/infoIcon.component";
import {
  PointContainer,
  PointName,
  StartPointName,
} from "./itineraryPoint.style";

export const ITINERARY_POINT_TYPE_CLASSES = {
  startingPoint: "startingPoint",
  stopOverPoint: "stopOverPoint",
};

const ItineraryPoint = ({ type, name }) => {
  return (
    <PointContainer>
      <InfoIcon
        iconType={
          type === ITINERARY_POINT_TYPE_CLASSES.startingPoint
            ? ICON_TYPE_CLASSES.locationBigGreen
            : ICON_TYPE_CLASSES.locationBigOrange
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
