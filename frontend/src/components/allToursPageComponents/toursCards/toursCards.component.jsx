import TourCard from "../../UIComponents/tourCard/tourCard.component";
import { ToursCardsContainer, ToursCardsWrapper } from "./toursCards.style";

const ToursCards = () => {
  return (
    <ToursCardsContainer>
      <ToursCardsWrapper>
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
