import {
  DifficultyIcon,
  GroupIcon,
  Info,
  InfoText,
  NumRaitings,
  PositionIcon,
  Price,
  Rating,
  RatingData,
  StarIcon,
  Stars,
  TentIcon,
  TourCardContainer,
  TourContent,
  TourDescription,
  TourFooter,
  TourInfos,
  TourPicture,
  TourTitle,
  Value,
} from "./tourCard.style";

const TourCard = () => {
  return (
    <TourCardContainer>
      <TourPicture></TourPicture>
      <TourTitle>The Sea Explorer</TourTitle>
      <TourContent>
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
        <Rating>
          <Stars>
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
          </Stars>
          <RatingData>
            <Value>4.9</Value>
            <NumRaitings>(6)</NumRaitings>
          </RatingData>
        </Rating>
        <Price>$497 per person</Price>
      </TourFooter>
    </TourCardContainer>
  );
};

export default TourCard;
