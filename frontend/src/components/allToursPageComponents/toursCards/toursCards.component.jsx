import TourCard from "../../UIComponents/tourCard/tourCard.component";
import { ToursCardsContainer, ToursCardsWrapper } from "./toursCards.style";

const ToursCards = ({ mapOpen }) => {
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
