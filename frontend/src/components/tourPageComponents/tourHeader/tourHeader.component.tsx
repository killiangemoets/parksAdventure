import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectTour,
  selectTourIsLoading,
} from "../../../store/tour/tour.selector";
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
  const tour = useSelector(selectTour);
  const isLoading = useSelector(selectTourIsLoading);

  return (
    <TourHeaderContainer>
      <TourHeaderWrapper>
        <TourHeaderLeft>
          <Title titleType={TITLE_TYPE_CLASSES.main}>
            {!isLoading && tour?.name}
          </Title>
          {!isLoading && (
            <StarsRating
              linkOnReviews={true}
              handleLinkTo={handleScrollToReviews}
              rating={tour?.ratingsAverage || 0}
              numRatings={tour?.ratingsQuantity || 0}
            />
          )}
        </TourHeaderLeft>
        <TourHeaderRight>
          <Button onClick={handleScrollToBooking}>Book Now</Button>
          <Price>
            <span>
              {tour?.currentAvailabilities &&
                tour?.currentAvailabilities.length > 0 &&
                `From $${tour?.lowerPrice || 0}`}
            </span>{" "}
            {tour?.currentAvailabilities &&
            tour?.currentAvailabilities.length > 0
              ? "per person"
              : "No availabilities at the moment!"}
          </Price>
        </TourHeaderRight>
      </TourHeaderWrapper>
    </TourHeaderContainer>
  );
};

export default TourHeader;
