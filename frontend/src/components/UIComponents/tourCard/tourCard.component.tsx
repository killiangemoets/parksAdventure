import { FC, MouseEvent, useRef } from "react";
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
import { useDispatch } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../../api/user-requests";
import { AppDispatch } from "../../../store/store";
import { updateUser } from "../../../store/user/user.action";
import useIsInWishList from "../../../hooks/isInWishList";

type TourCardProps = {
  tour: TourData;
  handleOver?: (id: string | undefined) => void;
};
const TourCard: FC<TourCardProps> = ({ tour, handleOver }) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistButton = useRef<HTMLElement | null>(null);
  const inWishList = useIsInWishList(tour?._id);

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
    _id,
  } = tour;

  const handleClickTour = (event: MouseEvent<HTMLElement>) => {
    if (
      wishlistButton.current &&
      wishlistButton.current.contains(event.target as Node)
    )
      return;

    navigate(`/tour/${slug}`);
    // window.open(`${window.location.origin}/tour/${slug}`, "_blank");
  };

  const handleWishlist = async () => {
    const response = inWishList
      ? await removeFromWishlist(_id)
      : await addToWishlist(_id);

    if (response && response.status === "success") {
      const { wishlist } = response.data.user;
      dispatch(
        updateUser({
          wishlist,
        })
      );
    }
  };

  // if (!tour) {
  //   return <></>;
  // } else {
  return (
    <TourCardContainer
      onClick={handleClickTour}
      onMouseEnter={() => {
        handleOver && handleOver(tour._id);
      }}
      onMouseLeave={() => {
        handleOver && handleOver(undefined);
      }}>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.empty}
        passRef={wishlistButton}
        onClick={handleWishlist}>
        <WishListIcon inWishList={inWishList} />
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
          Next start: {niceDate(tour.firstAvailability)}
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
              {tour.maxGroupSizeCapacity === tour.minGroupSizeCapacity
                ? tour.maxGroupSizeCapacity
                : `${tour.minGroupSizeCapacity}-${tour.maxGroupSizeCapacity}`}{" "}
              people
            </InfoText>
          </Info>
        </TourInfos>
      </TourContent>
      <TourFooter>
        <StarsRating rating={ratingsAverage} numRatings={ratingsQuantity} />
        <Price>
          <span>From ${tour.lowerPrice}</span> per person
        </Price>
      </TourFooter>
    </TourCardContainer>
  );
  // }
};

export default TourCard;
