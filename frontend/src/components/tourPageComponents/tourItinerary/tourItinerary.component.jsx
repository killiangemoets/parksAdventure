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

const ItineraryCaption = () => {
  return (
    <ItineraryCaptionContainer>
      <ItineraryPoint
        type={ITINERARY_POINT_TYPE_CLASSES.startingPoint}
        name="Meeting Point"
      />
      <ItineraryPoint
        type={ITINERARY_POINT_TYPE_CLASSES.stopOverPoint}
        name="Main Stops"
      />
    </ItineraryCaptionContainer>
  );
};

const TourItinerary = () => {
  return (
    <TourItineraryContainer>
      <TourItineraryWrapper>
        <Title titleType={TITLE_TYPE_CLASSES.section}>Itinerary</Title>
        <TourItineraryContent>
          <ItineraryLeftContainer>
            <ItineraryLine />
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
