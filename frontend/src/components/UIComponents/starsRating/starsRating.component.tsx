import { ConfigProvider } from "antd";
import { FC } from "react";
import {
  NumRatings,
  RatingData,
  StarsRatingContainer,
  RatingValue,
  LinkNumRatings,
  StarsRate,
} from "./starsRating.style";

export type StarsRatingCommonProps = {
  hiddenValue?: boolean;
  linkOnReviews?: boolean;
  handleLinkTo?: () => void;
  rating: number;
  numRatings?: number;
};

export type StarRatingCondiionalProps =
  | {
      readonly?: true;
      handleChangeRating?: never;
    }
  | {
      readonly: false;
      handleChangeRating: (value: number) => void;
    };

const StarsRating: FC<StarsRatingCommonProps & StarRatingCondiionalProps> = ({
  hiddenValue = false,
  linkOnReviews = false,
  handleLinkTo = () => {},
  readonly = true,
  rating,
  numRatings,
  handleChangeRating,
}) => {
  return (
    <StarsRatingContainer>
      <ConfigProvider
        theme={{
          hashed: false,
          components: {
            Rate: {
              colorFillContent: "#ddd",
            },
          },
        }}>
        <StarsRate
          allowHalf
          disabled={readonly}
          defaultValue={rating}
          value={rating}
          onChange={handleChangeRating}
        />
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
