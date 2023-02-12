import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GreenOpacity } from "../../../routes/home/home.style";
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
  TourDescription,
  TourFooter,
  TourInfos,
  TourNextDate,
  TourPicture,
  TourPictureContainer,
  TourTitle,
  WishListIcon,
} from "./tourCard.style";

const TourCard = () => {
  const navigate = useNavigate();

  const handleClickTour = () => {
    navigate("/tour");
  };
  return (
    <TourCardContainer onClick={handleClickTour}>
      <Button buttonType={BUTTON_TYPE_CLASSES.empty}>
        <WishListIcon />
      </Button>
      <TourPictureContainer>
        <TourPicture>
          <GreenOpacity />
        </TourPicture>
      </TourPictureContainer>
      <TourTitle>
        <span>The Sea Explorer</span>
      </TourTitle>
      <TourContent>
        <TourNextDate>Next start: March 23, 2023</TourNextDate>
        <TourDescription>
          Exploring the jaw-dropping US east coast by foot and by boat
        </TourDescription>
        <TourInfos>
          <Info>
            <InfoIcon iconType={INFO_ICON_TYPE_CLASSES.location} />
            <InfoText>Miami, USA</InfoText>
          </Info>
          <Info>
            <InfoIcon iconType={INFO_ICON_TYPE_CLASSES.duration} />
            <InfoText>7 days</InfoText>
          </Info>
          <Info>
            <InfoIcon iconType={INFO_ICON_TYPE_CLASSES.difficulty} />
            <InfoText>Medium</InfoText>
          </Info>
          <Info>
            <InfoIcon iconType={INFO_ICON_TYPE_CLASSES.group} />
            <InfoText>15 people</InfoText>
          </Info>
        </TourInfos>
      </TourContent>
      <TourFooter>
        <StarsRating />
        <Price>
          <span>From $497</span> per person
        </Price>
      </TourFooter>
    </TourCardContainer>
  );
};

export default TourCard;
