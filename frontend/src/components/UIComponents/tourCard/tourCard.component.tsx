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
  CornerBannner,
  Info,
  InfoText,
  Price,
  TourCardContainer,
  TourCardHidden,
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
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../../api/user-requests";
import { AppDispatch } from "../../../store/store";
import { updateUser } from "../../../store/user/user.action";
import useIsInWishList from "../../../hooks/isInWishList";
import {
  selectUserId,
  selectUserRole,
} from "../../../store/user/user.selector";
import getAuthenticationRedictionUri from "../../../utils/formatting/formatAuthenticationUri";
import { isUserAdminOrGuide } from "../../../utils/dataManipulation/IsUserRole";

type TourCardProps = {
  tour: TourData;
  handleOver?: (id: string | undefined) => void;
};
const TourCard: FC<TourCardProps> = ({ tour, handleOver }) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector(selectUserId);
  const userRole = useSelector(selectUserRole);
  const wishlistButton = useRef<HTMLElement | null>(null);
  const inWishList = useIsInWishList(tour?._id);

  const handleClickTour = (event: MouseEvent<HTMLElement>) => {
    if (
      wishlistButton.current &&
      wishlistButton.current.contains(event.target as Node)
    )
      return;

    navigate(`/tour/${tour.slug}`);
    // window.open(`${window.location.origin}/tour/${slug}`, "_blank");
  };

  const handleWishlist = async () => {
    if (!userId) {
      const uri = getAuthenticationRedictionUri(window.location.href);
      navigate(`/login?uri=${uri}`);
    }

    const response = inWishList
      ? await removeFromWishlist(tour._id)
      : await addToWishlist(tour._id);

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
      {tour.hiddenTour && (
        <TourCardHidden>
          <CornerBannner>Hidden Tour</CornerBannner>
        </TourCardHidden>
      )}
      {!isUserAdminOrGuide(userRole) && (
        <Button
          buttonType={BUTTON_TYPE_CLASSES.empty}
          passRef={wishlistButton}
          onClick={handleWishlist}>
          <WishListIcon inWishList={inWishList} />
        </Button>
      )}
      <TourPictureContainer>
        <TourPicture imageUrl={tour.imageCover}>
          <GreenOpacity />
        </TourPicture>
      </TourPictureContainer>
      <TourTitle>
        <span>{tour.name}</span>
      </TourTitle>
      <TourContent>
        <TourNextDate>
          {tour.firstAvailability
            ? `Next start: ${niceDate(tour.firstAvailability)}`
            : "Not available at the moment"}
        </TourNextDate>
        <TourTags>
          {tour.categories &&
            tour.categories.map((category) => (
              <TourTag key={category}>
                {category[0].toUpperCase() + category.slice(1).toLowerCase()}
              </TourTag>
            ))}
        </TourTags>

        <TourInfos>
          <Info>
            <InfoIcon iconType={INFO_ICON_TYPE_CLASSES.location} />
            <InfoText>{tour.location}</InfoText>
          </Info>
          <Info>
            <InfoIcon iconType={INFO_ICON_TYPE_CLASSES.duration} />
            <InfoText>
              {tour.duration > 1
                ? `${tour.duration} days`
                : `${tour.duration} day`}
            </InfoText>
          </Info>
          <Info>
            <InfoIcon iconType={INFO_ICON_TYPE_CLASSES.difficulty} />
            <InfoText>
              {tour.difficulty[0].toUpperCase() +
                tour.difficulty.slice(1).toLowerCase()}
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
        <StarsRating
          rating={tour.ratingsAverage}
          numRatings={tour.ratingsQuantity}
        />
        <Price>
          <span>{tour.lowerPrice ? `From ${tour.lowerPrice}` : ""}</span>{" "}
          {tour.lowerPrice ? "per person" : "No price available"}
        </Price>
      </TourFooter>
    </TourCardContainer>
  );
  // }
};

export default TourCard;
