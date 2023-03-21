import { FC } from "react";
import { TCreateStop, CREATE_TOUR_DATA } from "../../../../types/tour";
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
  ErrorMessage,
} from "./addTourItinerary.style";
import AddTourItineraryMap from "./addTourItineraryMap.component";

export type AddTourItineraryProps = {
  stops: TCreateStop[];
  handleChange: (stops: TCreateStop[], name: string) => void;
  error: boolean;
};

const AddTourItinerary: FC<AddTourItineraryProps> = ({
  stops,
  handleChange,
  error,
}) => {
  const addStop = (stop: TCreateStop) => {
    handleChange([...stops, stop], CREATE_TOUR_DATA.locations);
  };

  const deleteStop = (stopName: string) => {
    const newStops = stops.filter((stop) => stop.text !== stopName);
    handleChange(newStops, CREATE_TOUR_DATA.locations);
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
        <ErrorMessage>
          {error ? "Please add stops to the itinerary" : ""}
        </ErrorMessage>
      </AddTourItineraryWrapper>
    </TourItineraryContainer>
  );
};

export default AddTourItinerary;
