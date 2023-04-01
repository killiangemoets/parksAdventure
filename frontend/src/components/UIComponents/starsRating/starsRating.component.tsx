import { ConfigProvider, Rate } from "antd";
import { FC } from "react";
import {
  NumRatings,
  RatingData,
  StarsRatingContainer,
  RatingValue,
  LinkNumRatings,
} from "./starsRating.style";

export type StarsRatingProps = {
  hiddenValue?: boolean;
  linkOnReviews?: boolean;
  handleLinkTo?: () => void;
  readonly?: boolean;
  rating: number;
  numRatings?: number;
};

const StarsRating: FC<StarsRatingProps> = ({
  hiddenValue = false,
  linkOnReviews = false,
  handleLinkTo = () => {},
  readonly = true,
  rating,
  numRatings,
}) => {
  return (
    <StarsRatingContainer>
      <ConfigProvider
        theme={{
          components: {
            Rate: {
              colorFillContent: "#ddd",
            },
          },
        }}
      >
        <Rate allowHalf disabled={readonly} defaultValue={rating} />
      </ConfigProvider>

      {!hiddenValue && (
        <RatingData>
          <RatingValue>{rating}</RatingValue>
          {typeof numRatings !== "undefined" &&
            (!linkOnReviews ? (
              <NumRatings>({numRatings})</NumRatings>
            ) : (
              <LinkNumRatings onClick={handleLinkTo}>
                ({numRatings} reviews)
              </LinkNumRatings>
            ))}
        </RatingData>
      )}
    </StarsRatingContainer>
  );
};

export default StarsRating;
