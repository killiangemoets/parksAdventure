import { FC } from "react";
import {
  NumRatings,
  RatingData,
  StarIcon,
  StarsContainer,
  StarsRatingContainer,
  RatingValue,
  LinkNumRatings,
  HalfStarIcon,
  EmptyStarIcon,
} from "./starsRating.style";

export type StarsRatingProps = {
  hiddenValue?: boolean;
  linkOnReviews?: boolean;
  handleLinkTo?: () => void;
};

const StarsRating: FC<StarsRatingProps> = ({
  hiddenValue = false,
  linkOnReviews = false,
  handleLinkTo = () => {},
}) => {
  return (
    <StarsRatingContainer>
      <StarsContainer>
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <HalfStarIcon />
        {/* <EmptyStarIcon /> */}
      </StarsContainer>
      {!hiddenValue && (
        <RatingData>
          <RatingValue>4.8</RatingValue>
          {!linkOnReviews ? (
            <NumRatings>(6)</NumRatings>
          ) : (
            <LinkNumRatings onClick={handleLinkTo}>(6 reviews)</LinkNumRatings>
          )}
        </RatingData>
      )}
    </StarsRatingContainer>
  );
};

export default StarsRating;