import {
  NumRatings,
  RatingData,
  StarIcon,
  StarsContainer,
  StarsRatingContainer,
  RatingValue,
  LinkNumRatings,
} from "./starsRating.style";

const StarsRating = ({ hiddenValue = false, linkOnReviews = false }) => {
  return (
    <StarsRatingContainer>
      <StarsContainer>
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
      </StarsContainer>
      {!hiddenValue && (
        <RatingData>
          <RatingValue>4.9</RatingValue>
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
