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
  return (
    <TourRecommandationsContainer>
      <TourRecommandationsWrapper>
        <Title titleType={TITLE_TYPE_CLASSES.section}>
          You might also like...
        </Title>
        <RecommandationCards>
          {/* <TourCard />
          <TourCard />
          <TourCard /> */}
        </RecommandationCards>
      </TourRecommandationsWrapper>
    </TourRecommandationsContainer>
  );
};

export default TourRecommandations;
