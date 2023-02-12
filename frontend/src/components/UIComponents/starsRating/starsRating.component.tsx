import { ConfigProvider, Rate } from "antd";
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
  readonly?: boolean;
};

const StarsRating: FC<StarsRatingProps> = ({
  hiddenValue = false,
  linkOnReviews = false,
  handleLinkTo = () => {},
  readonly = true,
}) => {
  return (
    <StarsRatingContainer>
      {/* <StarsContainer>
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <HalfStarIcon />
        <EmptyStarIcon />
      </StarsContainer> */}
      {/* <Rate character={<StarIcon />} allowHalf disabled defaultValue={3.8} /> */}
      <ConfigProvider
        theme={{
          components: {
            Rate: {
              colorFillContent: "#ddd",
            },
          },
        }}
      >
        <Rate allowHalf disabled={readonly} defaultValue={3.8} />
      </ConfigProvider>

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
