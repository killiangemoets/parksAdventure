import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectTour,
  selectTourIsLoading,
} from "../../../store/tour/tour.selector";
import { TStop } from "../../../types/tour";
import CustomMap from "../../UIComponents/customMap/customMap.component";
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
  StopDescription,
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
  const tour = useSelector(selectTour);
  const isLoading = useSelector(selectTourIsLoading);
  const [points, setPoints] = useState<string[]>([]);
  const [stops, setStops] = useState<TStop[]>([]);
  const [selectedStop, setSelectedStop] = useState<TStop>();

  useEffect(() => {
    let newPoints = [];
    let newStops = [];
    if (tour?.startLocation) {
      newPoints.push(tour.startLocation.description);
      newStops.push(tour.startLocation);
    }
    if (tour?.locations) {
      tour.locations.forEach((location) => {
        newPoints.push(location.description);
      });
      newStops.push(...tour.locations);
    }
    setPoints(newPoints);
    setStops(newStops);
  }, [tour]);

  const handleSelectStop = (name: string) => {
    const newSelectedStop = stops.find((stop) => stop.description === name);
    if (newSelectedStop) setSelectedStop(newSelectedStop);
  };

  return (
    <TourItineraryContainer>
      <TourItineraryWrapper>
        <Title titleType={TITLE_TYPE_CLASSES.section}>Itinerary</Title>
        <TourItineraryContent>
          <ItineraryLeftContainer>
            <ItineraryLine
              points={isLoading ? [] : points}
              handleSelectStop={handleSelectStop}
            />
          </ItineraryLeftContainer>
          <ItineraryRightContainer>
            <ItineraryMapContainer>
              <CustomMap
                selectedLocation={
                  selectedStop
                    ? {
                        coordinates: selectedStop.coordinates,
                        popupContent: (
                          <StopDescription key={selectedStop._id}>
                            {selectedStop.description}
                          </StopDescription>
                        ),
                      }
                    : undefined
                }
                locations={
                  isLoading
                    ? []
                    : stops.map((stop) => {
                        return {
                          coordinates: stop.coordinates,
                          popupContent: (
                            <StopDescription key={stop._id}>
                              {stop.description}
                            </StopDescription>
                          ),
                        };
                      })
                }
                geolocationControl={true}
                fullscreenControl={true}
                navigationControl={true}
              />
            </ItineraryMapContainer>
            <ItineraryCaption />
          </ItineraryRightContainer>
        </TourItineraryContent>
      </TourItineraryWrapper>
    </TourItineraryContainer>
  );
};

export default TourItinerary;
