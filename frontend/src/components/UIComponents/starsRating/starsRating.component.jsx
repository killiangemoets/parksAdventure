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

const StarsRating = ({ hiddenValue = false, linkOnReviews = false }) => {
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
            <LinkNumRatings>(6 reviews)</LinkNumRatings>
          )}
        </RatingData>
      )}
    </StarsRatingContainer>
  );
};

export default StarsRating;