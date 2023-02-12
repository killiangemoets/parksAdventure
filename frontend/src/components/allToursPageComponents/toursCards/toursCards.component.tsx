import { FC } from "react";
import TourCard from "../../UIComponents/tourCard/tourCard.component";
import { ToursCardsContainer, ToursCardsWrapper } from "./toursCards.style";

export type ToursCardsProps = {
  mapOpen: boolean;
};

const ToursCards: FC<ToursCardsProps> = ({ mapOpen }) => {
  return (
    <ToursCardsContainer>
      <ToursCardsWrapper mapOpen={mapOpen}>
        <TourCard />
        <TourCard />
        <TourCard />
        <TourCard />
        <TourCard />
        <TourCard />
        <TourCard />
        <TourCard />
        <TourCard />
        <TourCard />
        <TourCard />
        <TourCard />
      </ToursCardsWrapper>
    </ToursCardsContainer>
  );
};

export default ToursCards;
