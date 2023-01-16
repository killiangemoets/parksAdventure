import Button from "../../UIComponents/button/button.component";
import StarsRating from "../../UIComponents/starsRating/starsRating.component";
import {
  Price,
  TourHeaderContainer,
  TourHeaderLeft,
  TourHeaderRight,
  TourHeaderWrapper,
  TourTitle,
} from "./tourHeader.style";

const TourHeader = () => {
  return (
    <TourHeaderContainer>
      <TourHeaderWrapper>
        <TourHeaderLeft>
          <TourTitle>The Forest Hiker</TourTitle>
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
