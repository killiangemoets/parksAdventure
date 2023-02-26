import ItineraryLine from "../../../tourPageComponents/itineratyLine/itineraryLine.component";
import { ItineraryCaption } from "../../../tourPageComponents/tourItinerary/tourItinerary.component";
import {
  ItineraryLeftContainer,
  ItineraryMapContainer,
  ItineraryRightContainer,
  TourItineraryContainer,
  TourItineraryContent,
  TourItineraryWrapper,
} from "../../../tourPageComponents/tourItinerary/tourItinerary.style";
import Map from "../../../UIComponents/map/map.component";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../../UIComponents/title/title.component";
import {
  AddTourItineraryContent,
  AddTourItineraryWrapper,
} from "./addTourItinerary.style";

const AddTourItinerary = () => {
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
      <AddTourItineraryWrapper>
        <Title titleType={TITLE_TYPE_CLASSES.section}>Itinerary</Title>
        <AddTourItineraryContent>
          <ItineraryLeftContainer>
            <ItineraryLine points={points} edit={true} />
          </ItineraryLeftContainer>
          <ItineraryRightContainer>
            <ItineraryMapContainer>
              <Map />
            </ItineraryMapContainer>
            <ItineraryCaption />
          </ItineraryRightContainer>
        </AddTourItineraryContent>
      </AddTourItineraryWrapper>
    </TourItineraryContainer>
  );
};

export default AddTourItinerary;
