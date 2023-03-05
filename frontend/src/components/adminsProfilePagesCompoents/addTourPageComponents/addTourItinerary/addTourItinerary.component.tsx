import { useState } from "react";
import ItineraryLine from "../../../tourPageComponents/itineratyLine/itineraryLine.component";
import { ItineraryCaption } from "../../../tourPageComponents/tourItinerary/tourItinerary.component";
import {
  ItineraryLeftContainer,
  ItineraryMapContainer,
  ItineraryRightContainer,
  TourItineraryContainer,
} from "../../../tourPageComponents/tourItinerary/tourItinerary.style";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../../UIComponents/title/title.component";
import {
  AddTourItineraryContent,
  AddTourItineraryWrapper,
} from "./addTourItinerary.style";
import AddTourItineraryMap from "./addTourItineraryMap.component";

export type StopProps = {
  latitude: number;
  longitude: number;
  text: string;
};

const AddTourItinerary = () => {
  const points = [
    "Day 1: Louise Lake",
    "Day 2: The Wood Cabin",
    "Day 3: Sky Waterfall",
    "Day 4: Castor Beach",
    "Day 5: The Rock Viewpoint",
    "Day 6: The Three Sisters",
  ];

  const [stops, setStops] = useState<StopProps[]>([]);

  const addStop = (stop: StopProps) => {
    console.log(stops);
    setStops([...stops, stop]);
  };

  const deleteStop = (stopName: string) => {
    console.log("delete", { stopName });
    const newStops = stops.filter((stop) => stop.text !== stopName);
    setStops(newStops);
  };

  return (
    <TourItineraryContainer>
      <AddTourItineraryWrapper>
        <Title titleType={TITLE_TYPE_CLASSES.section}>Itinerary</Title>
        <AddTourItineraryContent>
          <ItineraryLeftContainer>
            <ItineraryLine
              points={stops.map((stop) => stop.text)}
              handleDelete={deleteStop}
            />
          </ItineraryLeftContainer>
          <ItineraryRightContainer>
            <ItineraryMapContainer>
              <AddTourItineraryMap stops={stops} addStop={addStop} />
            </ItineraryMapContainer>
            <ItineraryCaption />
          </ItineraryRightContainer>
        </AddTourItineraryContent>
      </AddTourItineraryWrapper>
    </TourItineraryContainer>
  );
};

export default AddTourItinerary;
