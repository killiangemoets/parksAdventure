import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GreenOpacity } from "../../../routes/home/home.style";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import StarsRating from "../starsRating/starsRating.component";
import {
  DifficultyIcon,
  GroupIcon,
  Info,
  InfoText,
  PositionIcon,
  Price,
  TentIcon,
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
            <PositionIcon />
            <InfoText>Miami, USA</InfoText>
          </Info>
          <Info>
            <TentIcon />
            <InfoText>7 days</InfoText>
          </Info>
          <Info>
            <DifficultyIcon />
            <InfoText>Medium</InfoText>
          </Info>
          <Info>
            <GroupIcon />
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
