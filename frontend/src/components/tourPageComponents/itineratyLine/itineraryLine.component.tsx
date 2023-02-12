import ItineraryPoint, {
  ITINERARY_POINT_TYPE_CLASSES,
} from "../itineraryPoint/itineraryPoint.component";
import { ItineraryLineContainer, Line } from "./itineraryLine.style";

const ItineraryLine = () => {
  return (
    <ItineraryLineContainer>
      <ItineraryPoint
        type={ITINERARY_POINT_TYPE_CLASSES.startingPoint}
        name="Day 0: Rocky Montains"
      />
      <Line />
      <ItineraryPoint name="Day 1: Louise Lake" />
      <Line />
      <ItineraryPoint name="Day 2: The Wood Cabin" />
      <Line />
      <ItineraryPoint name="Day 3: Sky Waterfall" />
      <Line />
      <ItineraryPoint name="Day 4: Castor Beach" />
      <Line />
      <ItineraryPoint name="Day 5: The Rock Viewpoint" />
      <Line />
      <ItineraryPoint name="Day 6: The Three Sisters" />
      <Line />
      <ItineraryPoint
        type={ITINERARY_POINT_TYPE_CLASSES.startingPoint}
        name="Day 7: Rocky Mountains"
      />
    </ItineraryLineContainer>
  );
};

export default ItineraryLine;