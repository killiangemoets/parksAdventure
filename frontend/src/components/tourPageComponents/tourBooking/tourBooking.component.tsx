import { FC, useEffect, useState } from "react";

import Title, {
  TITLE_TYPE_CLASSES,
} from "../../UIComponents/title/title.component";
import ProfilePicture, {
  PROFILE_PICTURE_SIZE_CLASSES,
} from "../../UIComponents/profilePicture/profilePicture.component";
import {
  Picture1,
  Picture2,
  Picture3,
  SecondTitle,
  Titles,
  TourBookingBox,
  TourBookingContainer,
  TourBookingPictures,
  TourBookingWrapper,
} from "./tourBooking.style";
import TourBookingInputs from "./tourBookingInputs.component";
import { useSelector } from "react-redux";
import {
  selectTour,
  selectTourIsLoading,
} from "../../../store/tour/tour.selector";
import TourBookingDetails from "./tourBookingDetails.component";
import { CountInputState } from "../../UIComponents/dropdown/dropdownCounts.component";
import { TAvailability } from "../../../types/tour";
import { useParams } from "react-router-dom";
import Alert from "../../UIComponents/alert/alert.component";
import { selectCartItems } from "../../../store/cart/cart.selector";
import compareDates from "../../../utils/comparison/compareDates";

export type TourBookingProps = {
  forwardRef?: React.MutableRefObject<HTMLDivElement | null>;
};

type TourSlugRouteParams = {
  slug: string;
};

export const defaultCountInputs = [
  { id: "adult", title: "Adult", subtitle: "(16+ years)", value: 0 },
  { id: "child", title: "Child", subtitle: "(4-15 years)", value: 0 },
];

const TourBooking: FC<TourBookingProps> = ({ forwardRef }) => {
  const { slug } = useParams<
    keyof TourSlugRouteParams
  >() as TourSlugRouteParams;
  const tour = useSelector(selectTour);
  const isLoading = useSelector(selectTourIsLoading);
  const cartItems = useSelector(selectCartItems);

  const [selectedAvailability, setSelectedAvailability] = useState<
    TAvailability | undefined
  >(undefined);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [currentCountInputs, setCurrentCountInputs] =
    useState<CountInputState[]>(defaultCountInputs);

  const [alertMessage, setAlertMessage] = useState<string | undefined>(
    undefined
  );
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    if (
      (currentCountInputs[0].value === 0 &&
        currentCountInputs[1].value === 0) ||
      !selectedAvailability
    ) {
      setShowDetails(false);
    }
  }, [selectedAvailability, currentCountInputs]);

  useEffect(() => {
    setSelectedAvailability(undefined);
    setCurrentCountInputs(defaultCountInputs);
  }, [slug]);

  const handleChangeGroup = (group: CountInputState[]) => {
    const currentCartItem = selectedAvailability
      ? cartItems.find(
          (item) =>
            compareDates(item.startingDate, selectedAvailability?.date) &&
            item.tourId === tour?._id
        )
      : undefined;

    const spotsLeft = selectedAvailability
      ? selectedAvailability.maxGroupSize -
        selectedAvailability.currentGroupSize -
        (currentCartItem
          ? currentCartItem.adults + currentCartItem.children
          : 0)
      : 0;

    if (
      (selectedAvailability && group[0].value + group[1].value > spotsLeft) ||
      (tour && group[0].value + group[1].value > tour?.maxGroupSizeCapacity)
    ) {
      const spotsString = spotsLeft > 1 ? "spots" : "spot";
      setAlertMessage(
        tour && group[0].value + group[1].value > tour?.maxGroupSizeCapacity
          ? `The maximum group size for this tour is ${tour?.maxGroupSizeCapacity} people`
          : spotsLeft
          ? `There is only ${
              spotsLeft > 0 ? spotsLeft : 0
            } ${spotsString} left for this date`
          : "There is no spot left for this date"
      );
      setTimeout(function () {
        setAlertMessage(undefined);
      }, 4000);
    } else {
      setCurrentCountInputs(group);
    }
  };
  const handleChangeAvailability = (
    availability: TAvailability | undefined
  ) => {
    const currentCartItem = availability
      ? cartItems.find((item) =>
          compareDates(item.startingDate, availability?.date)
        )
      : undefined;

    const spotsLeft = availability
      ? availability.maxGroupSize -
        availability.currentGroupSize -
        (currentCartItem
          ? currentCartItem.adults + currentCartItem.children
          : 0)
      : 0;

    if (
      availability &&
      currentCountInputs[0].value + currentCountInputs[1].value > spotsLeft
    ) {
      const spotsString = spotsLeft > 1 ? "spots" : "spot";
      setAlertMessage(
        spotsLeft
          ? `There is only ${
              spotsLeft > 0 ? spotsLeft : 0
            } ${spotsString} left for this date`
          : `There is no spot left for this date`
      );
      setTimeout(function () {
        setAlertMessage(undefined);
      }, 4000);
      setCurrentCountInputs(defaultCountInputs);
    }
    setSelectedAvailability(availability);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 525 && !isSmallScreen) {
        setIsSmallScreen(true);
      } else if (window.innerWidth > 525 && isSmallScreen) {
        setIsSmallScreen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
  }, [isSmallScreen]);

  return (
    <TourBookingContainer ref={forwardRef}>
      <TourBookingWrapper>
        <TourBookingBox>
          <Titles>
            <Title titleType={TITLE_TYPE_CLASSES.section}>
              What Are You Waiting For?
            </Title>
            {!isLoading && (
              <SecondTitle>
                {tour?.duration && tour.duration > 1
                  ? `${tour?.duration} days.`
                  : `${tour?.duration} day.`}{" "}
                1 adventure. Infinite Memories. Make it yours today!
              </SecondTitle>
            )}
          </Titles>
          <TourBookingInputs
            currentAvailability={selectedAvailability}
            currentGroup={currentCountInputs}
            handleChangeAvailability={handleChangeAvailability}
            handleChangeGroup={handleChangeGroup}
            handleSeeDetails={() => {
              setShowDetails(true);
            }}
          />
          {!isSmallScreen && !isLoading && (
            <TourBookingPictures>
              <Picture1>
                <ProfilePicture
                  pictureUrl={tour?.imageCover}
                  pictureSize={PROFILE_PICTURE_SIZE_CLASSES.extraLarge}
                />
              </Picture1>
              <Picture2>
                <ProfilePicture
                  pictureUrl={tour?.images[0]}
                  pictureSize={PROFILE_PICTURE_SIZE_CLASSES.extraLarge}
                />
              </Picture2>
              <Picture3>
                <ProfilePicture
                  pictureUrl={tour?.images[1]}
                  pictureSize={PROFILE_PICTURE_SIZE_CLASSES.extraLarge}
                />
              </Picture3>
            </TourBookingPictures>
          )}
        </TourBookingBox>

        {showDetails && selectedAvailability && (
          <TourBookingDetails
            availability={selectedAvailability}
            group={currentCountInputs}
          />
        )}
      </TourBookingWrapper>
      {alertMessage && <Alert>{alertMessage}</Alert>}
    </TourBookingContainer>
  );
};

export default TourBooking;
