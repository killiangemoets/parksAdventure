import { FC } from "react";
import { TourData } from "../../../types/tour";
import Title, { TITLE_TYPE_CLASSES } from "../title/title.component";
import TourCard from "../tourCard/tourCard.component";
import {
  RecommendationCards,
  TourRecommendationsContainer,
  TourRecommendationsWrapper,
} from "./tourRecommendations.style";
import { useSelector } from "react-redux";
import { selectTourIsLoading } from "../../../store/tour/tour.selector";

type TourRecommendationsProps = {
  tours: TourData[];
};

const TourRecommendations: FC<TourRecommendationsProps> = ({ tours }) => {
  const isLoading = useSelector(selectTourIsLoading);
  return (
    <TourRecommendationsContainer>
      <TourRecommendationsWrapper>
        <Title titleType={TITLE_TYPE_CLASSES.section}>
          You might also like...
        </Title>
        <RecommendationCards>
          {!isLoading &&
            tours &&
            tours.map((tour) => <TourCard key={tour._id} tour={tour} />)}
        </RecommendationCards>
      </TourRecommendationsWrapper>
    </TourRecommendationsContainer>
  );
};

export default TourRecommendations;
