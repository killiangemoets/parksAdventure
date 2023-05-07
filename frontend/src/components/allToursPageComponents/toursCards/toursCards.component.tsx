import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectTours,
  selectToursError,
} from "../../../store/tours/tours.selector";
import TourCard from "../../UIComponents/tourCard/tourCard.component";
import { ToursCardsContainer, ToursCardsWrapper } from "./toursCards.style";

export type ToursCardsProps = {
  mapOpen?: boolean;
  handleOverTourCard?: (id: string | undefined) => void;
};

const ToursCards: FC<ToursCardsProps> = ({
  mapOpen = false,
  handleOverTourCard,
}) => {
  const tours = useSelector(selectTours);
  const error = useSelector(selectToursError);

  // useEffect(() => {
  //   console.log(error);
  // }, [error]);

  return (
    <ToursCardsContainer>
      <ToursCardsWrapper mapOpen={mapOpen}>
        {tours &&
          tours.map((tour) => (
            <TourCard
              key={tour._id}
              tour={tour}
              handleOver={handleOverTourCard}
            />
          ))}
      </ToursCardsWrapper>
    </ToursCardsContainer>
  );
};

export default ToursCards;
