import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GreenOpacity } from "../../../routes/home/home.style";
import { TourData } from "../../../types/tour";
import niceDate from "../../../utils/formatting/niceDate";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import InfoIcon, {
  INFO_ICON_TYPE_CLASSES,
} from "../infoIcon/infoIcon.component";
import StarsRating from "../starsRating/starsRating.component";
import {
  Info,
  InfoText,
  Price,
  TourCardContainer,
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
} from "./tourCard.style";

type TourCardProps = {
  tour: TourData;
};
const TourCard: FC<TourCardProps> = ({ tour }) => {
  const navigate = useNavigate();

  const {
    name,
    categories,
    difficulty,
    duration,
    availabilities,
    location,
    imageCover,
    ratingsAverage,
    ratingsQuantity,
  } = tour;

  const [nextStart, setNextStart] = useState<string | null>(null);
  const [maxGroupSize, setMaxGroupSize] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");

  useEffect(() => {
    if (availabilities && availabilities.length > 0) {
      let newStart: Date | null = null;
      let newMaxGroupSize = availabilities[0].maxGroupSize || 0;
      let newMinPrice = availabilities[0].price;

      availabilities.forEach((availability) => {
        if (new Date(availability.date) > new Date(Date.now())) {
          if (!newStart) newStart = availability.date;
          else if (availability.date < newStart) newStart = availability.date;
        }
        if (availability.maxGroupSize < newMaxGroupSize)
          newMaxGroupSize = availability.maxGroupSize;
        if (availability.price < newMinPrice) newMinPrice = availability.price;
      });

      newStart && setNextStart(niceDate(newStart));
      setMaxGroupSize(newMaxGroupSize.toString());
      setMinPrice(newMinPrice.toString());
    }
  }, []);

  const handleClickTour = () => {
    navigate("/tour");
  };
  if (!nextStart) {
    return <></>;
  } else {
    return (
      <TourCardContainer onClick={handleClickTour}>
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
          <TourNextDate>Next start: {nextStart}</TourNextDate>
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
                {difficulty[0].toUpperCase() +
                  difficulty.slice(1).toLowerCase()}
              </InfoText>
            </Info>
            <Info>
              <InfoIcon iconType={INFO_ICON_TYPE_CLASSES.group} />
              <InfoText>{maxGroupSize} people</InfoText>
            </Info>
          </TourInfos>
        </TourContent>
        <TourFooter>
          <StarsRating rating={ratingsAverage} numRatings={ratingsQuantity} />
          <Price>
            <span>From ${minPrice}</span> per person
          </Price>
        </TourFooter>
      </TourCardContainer>
    );
  }
};

export default TourCard;
