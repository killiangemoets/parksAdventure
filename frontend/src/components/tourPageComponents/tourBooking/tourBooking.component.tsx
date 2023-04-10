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
import desertImg from "../../../assets/bookingImg/desert.jpg";
import canadianRockiesImg from "../../../assets/bookingImg/canadianRockies.jpg";
import familyImg from "../../../assets/bookingImg/family.jpg";
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

export type TourBookingProps = {
  forwardRef?: React.MutableRefObject<HTMLDivElement | null>;
};

type TourSlugRouteParams = {
  slug: string;
};

const defaultCountInputs = [
  { id: "adult", title: "Adult", subtitle: "(16+ years)", value: 0 },
  { id: "child", title: "Child", subtitle: "(4-15 years)", value: 0 },
];

const TourBooking: FC<TourBookingProps> = ({ forwardRef }) => {
  const { slug } = useParams<
    keyof TourSlugRouteParams
  >() as TourSlugRouteParams;
  const tour = useSelector(selectTour);
  const isLoading = useSelector(selectTourIsLoading);
  const [selectedAvailability, setSelectedAvailability] = useState<
    TAvailability | undefined
  >(undefined);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [currentCountInputs, setCurrentCountInputs] =
    useState<CountInputState[]>(defaultCountInputs);

  const [alertMessage, setAlertMessage] = useState<string | undefined>(
    undefined
  );

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
    console.log("handleChangeGroup", group);
    if (
      (selectedAvailability &&
        group[0].value + group[1].value >
          selectedAvailability.maxGroupSize -
            selectedAvailability.currentGroupSize) ||
      (tour && group[0].value + group[1].value > tour?.maxGroupSizeCapacity)
    ) {
      setAlertMessage(
        tour && group[0].value + group[1].value > tour?.maxGroupSizeCapacity
          ? `The maximum group size for this tour is ${tour?.maxGroupSizeCapacity} people`
          : `There is only ${
              (selectedAvailability?.maxGroupSize || 0) -
              (selectedAvailability?.currentGroupSize || 0)
            } spots left for this date`
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
    console.log("handleChangeAvailability", availability);
    if (
      availability &&
      currentCountInputs[0].value + currentCountInputs[1].value >
        availability.maxGroupSize - availability.currentGroupSize
    ) {
      setAlertMessage(
        `There is only ${
          availability.maxGroupSize - availability.currentGroupSize
        } spots left for this date`
      );
      setTimeout(function () {
        setAlertMessage(undefined);
      }, 4000);
      setCurrentCountInputs(defaultCountInputs);
    }
    setSelectedAvailability(availability);
  };

  return (
    <TourBookingContainer ref={forwardRef}>
      <TourBookingWrapper>
        {!isLoading && (
          <TourBookingBox>
            <Titles>
              <Title titleType={TITLE_TYPE_CLASSES.section}>
                What Are You Waiting For?
              </Title>
              <SecondTitle>
                {tour?.duration && tour.duration > 1
                  ? `${tour?.duration} days.`
                  : `${tour?.duration} day.`}{" "}
                1 adventure. Infinite Memories. Make it yours today!`
              </SecondTitle>
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
            <TourBookingPictures>
              <Picture1>
                <ProfilePicture
                  pictureUrl={tour?.imageCover || desertImg}
                  pictureSize={PROFILE_PICTURE_SIZE_CLASSES.extraLarge}
                />
              </Picture1>
              <Picture2>
                <ProfilePicture
                  pictureUrl={
                    tour?.images && tour?.images[0]
                      ? tour?.images[0]
                      : canadianRockiesImg
                  }
                  pictureSize={PROFILE_PICTURE_SIZE_CLASSES.extraLarge}
                />
              </Picture2>
              <Picture3>
                <ProfilePicture
                  pictureUrl={
                    tour?.images && tour?.images[1]
                      ? tour?.images[1]
                      : familyImg
                  }
                  pictureSize={PROFILE_PICTURE_SIZE_CLASSES.extraLarge}
                />
              </Picture3>
            </TourBookingPictures>
          </TourBookingBox>
        )}
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
