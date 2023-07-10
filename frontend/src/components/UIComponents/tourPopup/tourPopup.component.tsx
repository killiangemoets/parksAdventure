import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { GreenOpacity } from "../../../routes/home/home.style";
import { TourData } from "../../../types/tour";
import niceDate from "../../../utils/formatting/formatDates";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import InfoIcon, {
  INFO_ICON_TYPE_CLASSES,
} from "../infoIcon/infoIcon.component";
import StarsRating from "../starsRating/starsRating.component";
import {
  Info,
  InfoText,
  Price,
  TourPopupContainer,
  TourContent,
  TourFooter,
  TourInfos,
  TourNextDate,
  TourPicture,
  TourPictureContainer,
  TourTag,
  TourTags,
  TourTitle,
  WishListIcon,
} from "./tourPopup.style";

type TourPopupProps = {
  tour: TourData;
};
const TourPopup: FC<TourPopupProps> = ({ tour }) => {
  const navigate = useNavigate();

  const {
    name,
    slug,
    categories,
    difficulty,
    duration,
    location,
    imageCover,
    ratingsAverage,
    ratingsQuantity,
  } = tour;

  const handleClickTour = () => {
    navigate(`/tour/${slug}`);
  };

  return (
    <TourPopupContainer onClick={handleClickTour}>
      <Button buttonType={BUTTON_TYPE_CLASSES.empty}>
        <WishListIcon />
      </Button>
      <TourPictureContainer>
        <TourPicture imageUrl={imageCover}>
          <GreenOpacity />
        </TourPicture>
      </TourPictureContainer>
      <TourTitle>
        <span>{name}</span>
      </TourTitle>
      <TourContent>
        <TourNextDate>
          {tour.firstAvailability
            ? `Next start: ${niceDate(tour.firstAvailability)}`
            : "Not available at the moment"}
        </TourNextDate>
        <TourTags>
          {categories &&
            categories.map((category) => (
              <TourTag key={category}>
                {category[0].toUpperCase() + category.slice(1).toLowerCase()}
              </TourTag>
            ))}
        </TourTags>

        <TourInfos>
          <Info>
            <InfoIcon iconType={INFO_ICON_TYPE_CLASSES.location} />
            <InfoText>{location}</InfoText>
          </Info>
          <Info>
            <InfoIcon iconType={INFO_ICON_TYPE_CLASSES.duration} />
            <InfoText>
              {duration > 1 ? `${duration} days` : `${duration} day`}
            </InfoText>
          </Info>
          <Info>
            <InfoIcon iconType={INFO_ICON_TYPE_CLASSES.difficulty} />
            <InfoText>
              {difficulty[0].toUpperCase() + difficulty.slice(1).toLowerCase()}
            </InfoText>
          </Info>
          <Info>
            <InfoIcon iconType={INFO_ICON_TYPE_CLASSES.group} />
            <InfoText>
              {!tour.maxGroupSizeCapacity
                ? "Not available"
                : tour.maxGroupSizeCapacity === tour.minGroupSizeCapacity
                ? `${tour.maxGroupSizeCapacity} people`
                : `${tour.minGroupSizeCapacity}-${tour.maxGroupSizeCapacity} people`}
            </InfoText>
          </Info>
        </TourInfos>
      </TourContent>
      <TourFooter>
        <StarsRating rating={ratingsAverage} numRatings={ratingsQuantity} />
        <Price>
          <span>{tour.lowerPrice ? `From ${tour.lowerPrice}` : ""}</span>{" "}
          {tour.lowerPrice ? "per person" : "No price available"}
        </Price>
      </TourFooter>
    </TourPopupContainer>
  );
  // }
};

export default TourPopup;
