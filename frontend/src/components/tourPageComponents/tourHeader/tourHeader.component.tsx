import { FC } from "react";
import { useSelector } from "react-redux";
import {
  selectTour,
  selectTourIsLoading,
} from "../../../store/tour/tour.selector";
import Button from "../../UIComponents/button/button.component";
import StarsRating from "../../UIComponents/starsRating/starsRating.component";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../UIComponents/title/title.component";
import {
  Price,
  TourHeaderContainer,
  TourHeaderLeft,
  TourHeaderRight,
  TourHeaderWrapper,
} from "./tourHeader.style";
import { selectUserRole } from "../../../store/user/user.selector";
import { isUserAdminOrGuide } from "../../../utils/dataManipulation/IsUserRole";

export type TourHeaderProps = {
  handleScrollToBooking: () => void;
  handleScrollToReviews: () => void;
};

const TourHeader: FC<TourHeaderProps> = ({
  handleScrollToBooking,
  handleScrollToReviews,
}) => {
  const userRole = useSelector(selectUserRole);
  const tour = useSelector(selectTour);
  const isLoading = useSelector(selectTourIsLoading);

  return (
    <TourHeaderContainer>
      <TourHeaderWrapper>
        <TourHeaderLeft>
          <Title titleType={TITLE_TYPE_CLASSES.main}>
            {!isLoading && tour?.name}
          </Title>
          {!isLoading && (
            <StarsRating
              linkOnReviews={true}
              handleLinkTo={handleScrollToReviews}
              rating={tour?.ratingsAverage || 0}
              numRatings={tour?.ratingsQuantity || 0}
            />
          )}
        </TourHeaderLeft>
        {!isUserAdminOrGuide(userRole) && (
          <TourHeaderRight>
            <Button onClick={handleScrollToBooking}>Book Now</Button>
            <Price>
              <span>
                {tour?.currentAvailabilities &&
                  tour?.currentAvailabilities.length > 0 &&
                  `From $${tour?.lowerPrice || 0}`}
              </span>{" "}
              {tour?.currentAvailabilities &&
              tour?.currentAvailabilities.length > 0
                ? "per person"
                : "No availabilities at the moment!"}
            </Price>
          </TourHeaderRight>
        )}
      </TourHeaderWrapper>
    </TourHeaderContainer>
  );
};

export default TourHeader;
