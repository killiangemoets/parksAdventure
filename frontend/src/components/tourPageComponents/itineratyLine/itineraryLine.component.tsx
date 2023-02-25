import { FC } from "react";
import ItineraryPoint, {
  ItineraryPointProps,
  ITINERARY_POINT_TYPE_CLASSES,
} from "../itineraryPoint/itineraryPoint.component";
import { ItineraryLineContainer, Line } from "./itineraryLine.style";

export type ItineraryLineProps = {
  points: ItineraryPointProps["name"][];
  edit?: ItineraryPointProps["edit"];
};

const ItineraryLine: FC<ItineraryLineProps> = ({ points, edit }) => {
  return (
    <ItineraryLineContainer>
      {points.map((point, i) => (
        <>
          <ItineraryPoint
            type={
              i === 0 || i === points.length - 1
                ? ITINERARY_POINT_TYPE_CLASSES.startingPoint
                : ITINERARY_POINT_TYPE_CLASSES.stopOverPoint
            }
            name={point}
            edit={edit}
          />
          {i !== points.length - 1 && <Line />}
        </>
      ))}
    </ItineraryLineContainer>
  );
};

export default ItineraryLine;
