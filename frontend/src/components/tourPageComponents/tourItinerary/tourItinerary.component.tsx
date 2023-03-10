import Map from "../../UIComponents/map/map.component";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../UIComponents/title/title.component";
import ItineraryPoint, {
  ITINERARY_POINT_TYPE_CLASSES,
} from "../itineraryPoint/itineraryPoint.component";
import ItineraryLine from "../itineratyLine/itineraryLine.component";
import {
  ItineraryCaptionContainer,
  ItineraryLeftContainer,
  ItineraryMapContainer,
  ItineraryRightContainer,
  TourItineraryContainer,
  TourItineraryContent,
  TourItineraryWrapper,
} from "./tourItinerary.style";

export const ItineraryCaption = () => {
  return (
    <ItineraryCaptionContainer>
      <ItineraryPoint
        type={ITINERARY_POINT_TYPE_CLASSES.startingPoint}
        name="Meeting Point"
      />
      <ItineraryPoint name="Main Stops" />
    </ItineraryCaptionContainer>
  );
};

const TourItinerary = () => {
  const points = [
    "Day 1: Louise Lake",
    "Day 2: The Wood Cabin",
    "Day 3: Sky Waterfall",
    "Day 4: Castor Beach",
    "Day 5: The Rock Viewpoint",
    "Day 6: The Three Sisters",
  ];
  return (
    <TourItineraryContainer>
      <TourItineraryWrapper>
        <Title titleType={TITLE_TYPE_CLASSES.section}>Itinerary</Title>
        <TourItineraryContent>
          <ItineraryLeftContainer>
            <ItineraryLine points={points} />
          </ItineraryLeftContainer>
          <ItineraryRightContainer>
            <ItineraryMapContainer>
              <Map />
            </ItineraryMapContainer>
            <ItineraryCaption />
          </ItineraryRightContainer>
        </TourItineraryContent>
      </TourItineraryWrapper>
    </TourItineraryContainer>
  );
};

export default TourItinerary;
