import Button from "../../UIComponents/button/button.component";
import StarsRating from "../../UIComponents/starsRating/starsRating.component";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../UIComponents/title/title.component";
import {
  Price,
  TourHeaderContainer,
  TourHeaderLeft,
  TourHeaderRight,
  TourHeaderWrapper,
} from "./tourHeader.style";

const TourHeader = () => {
  return (
    <TourHeaderContainer>
      <TourHeaderWrapper>
        <TourHeaderLeft>
          <Title titleType={TITLE_TYPE_CLASSES.main}>The Forest Hiker</Title>
          <StarsRating linkOnReviews={true} />
        </TourHeaderLeft>
        <TourHeaderRight>
          <Button>Book Now</Button>
          <Price>
            <span>From $497</span> per person
          </Price>
        </TourHeaderRight>
      </TourHeaderWrapper>
    </TourHeaderContainer>
  );
};

export default TourHeader;
