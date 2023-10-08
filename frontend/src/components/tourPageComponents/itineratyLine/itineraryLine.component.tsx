import { FC } from "react";
import ItineraryPoint, {
  ITINERARY_POINT_TYPE_CLASSES,
} from "../itineraryPoint/itineraryPoint.component";
import { ItineraryLineContainer, Line } from "./itineraryLine.style";

export type ItineraryLineProps = {
  points: string[];
  handleDelete?: (name: string) => void;
  handleSelectStop?: (name: string) => void;
};

const ItineraryLine: FC<ItineraryLineProps> = ({
  points,
  handleDelete,
  handleSelectStop,
}) => {
  return (
    <ItineraryLineContainer>
      {points.map((point, i) => (
        <>
          <ItineraryPoint
            key={i}
            type={
              i === 0
                ? ITINERARY_POINT_TYPE_CLASSES.startingPoint
                : ITINERARY_POINT_TYPE_CLASSES.stopOverPoint
            }
            name={point}
            handleDelete={handleDelete}
            handleSelectStop={handleSelectStop}
          />
          {i !== points.length - 1 && <Line />}
        </>
      ))}
    </ItineraryLineContainer>
  );
};

export default ItineraryLine;
