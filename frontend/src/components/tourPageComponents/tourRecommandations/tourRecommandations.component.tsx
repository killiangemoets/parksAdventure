import { useSelector } from "react-redux";
import { selectRecommandations } from "../../../store/tour/tour.selector";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../UIComponents/title/title.component";
import TourCard from "../../UIComponents/tourCard/tourCard.component";
import {
  RecommandationCards,
  TourRecommandationsContainer,
  TourRecommandationsWrapper,
} from "./tourRecommandations.style";

const TourRecommandations = () => {
  const recommandations = useSelector(selectRecommandations);

  return (
    <TourRecommandationsContainer>
      <TourRecommandationsWrapper>
        <Title titleType={TITLE_TYPE_CLASSES.section}>
          You might also like...
        </Title>
        <RecommandationCards>
          {recommandations &&
            recommandations.map((tour) => (
              <TourCard key={tour._id} tour={tour} />
            ))}
        </RecommandationCards>
      </TourRecommandationsWrapper>
    </TourRecommandationsContainer>
  );
};

export default TourRecommandations;
