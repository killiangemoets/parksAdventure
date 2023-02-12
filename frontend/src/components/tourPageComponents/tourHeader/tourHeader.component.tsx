import { FC } from "react";
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

export type TourHeaderProps = {
  handleScrollToBooking: () => void;
  handleScrollToReviews: () => void;
};

const TourHeader: FC<TourHeaderProps> = ({
  handleScrollToBooking,
  handleScrollToReviews,
}) => {
  return (
    <TourHeaderContainer>
      <TourHeaderWrapper>
        <TourHeaderLeft>
          <Title titleType={TITLE_TYPE_CLASSES.main}>The Forest Hiker</Title>
          <StarsRating
            linkOnReviews={true}
            handleLinkTo={handleScrollToReviews}
          />
        </TourHeaderLeft>
        <TourHeaderRight>
          <Button onClick={handleScrollToBooking}>Book Now</Button>
          <Price>
            <span>From $497</span> per person
          </Price>
        </TourHeaderRight>
      </TourHeaderWrapper>
    </TourHeaderContainer>
  );
};

export default TourHeader;
