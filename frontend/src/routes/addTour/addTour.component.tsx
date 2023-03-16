import { useEffect, useState } from "react";
import AddTourCalendar from "../../components/adminsProfilePagesCompoents/addTourPageComponents/addTourCalendar/addTourCalendar.component";
import AddTourDetails from "../../components/adminsProfilePagesCompoents/addTourPageComponents/addTourDetails/addTourDetails.component";
import AddTourImages from "../../components/adminsProfilePagesCompoents/addTourPageComponents/addTourImages/addTourImages.component";
import AddTourItinerary from "../../components/adminsProfilePagesCompoents/addTourPageComponents/addTourItinerary/addTourItinerary.component";
import AddTourPracticalInfos from "../../components/adminsProfilePagesCompoents/addTourPageComponents/addTourPracticalInfos/addTourPracticalInfos.component";
import AddTourTitle from "../../components/adminsProfilePagesCompoents/addTourPageComponents/addTourTitle/addTourTitle.component";
import {
  AddTourButtons,
  AddTourButtonsWrapper,
  AddTourContainer,
  CancelButton,
  ErrorMessage,
  MainButton,
} from "./addTour.style";
import type { Dayjs } from "dayjs";
import type { UploadFile } from "antd/es/upload/interface";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../components/UIComponents/button/button.component";
import CheckBoxes from "../../components/UIComponents/checkBoxes/checkBoxes.component";
import { Availability, Stop, TourData, TOUR_DATA } from "../../types/tour";
import { createTour, getTourGuides } from "../../api/tour-requests";
import Spinner from "../../components/UIComponents/spinner/spinner.component";
import { TUser } from "../../types/user";

export type NewTourDataValueTypes =
  | string
  | string[]
  | number
  | Info
  | Info[]
  | Stop[]
  | Availability[]
  | UploadFile[]
  | undefined
  | null
  | boolean
  | Dayjs;

const newTourDataDefaultState: TourData = {
  title: "",
  images: [],
  duration: undefined,
  difficulty: {
    id: "null",
    value: "Select a difficulty",
  },
  location: "",
  categories: [],
  summary: "",
  tourGuides: [],
  itinerary: [],
  availabilities: [],
  address: "",
  additionalInfo: [],
  hidden: false,
};

type ErrorsProps = {
  title: boolean;
  images: boolean;
  duration: boolean;
  difficulty: boolean;
  location: boolean;
  categories: boolean;
  summary: boolean;
  tourGuides: boolean;
  itinerary: boolean;
  // availabilities: boolean;
  address: boolean;
  generalMessage: string;
};

const defaultErrorsState: ErrorsProps = {
  title: false,
  images: false,
  duration: false,
  difficulty: false,
  location: false,
  categories: false,
  summary: false,
  tourGuides: false,
  itinerary: false,
  // availabilities: false,
  address: false,
  generalMessage: "",
};

const AddTour = () => {
  const [newTourData, setNewTourData] = useState<TourData>(
    newTourDataDefaultState
  );
  const {
    title,
    images,
    duration,
    difficulty,
    location,
    categories,
    summary,
    tourGuides,
    itinerary,
    availabilities,
    address,
    additionalInfo,
    hidden,
  } = newTourData;
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorsProps>(defaultErrorsState);
  const [tourGuidesList, setTourGuidesList] = useState<TUser[]>([]);

  useEffect(() => {
    const loadTourGuides = async () => {
      const response = await getTourGuides();
      setTourGuidesList(response);
    };
    loadTourGuides();
  }, []);

  const handleChange = (value: NewTourDataValueTypes, name: string) => {
    setNewTourData({ ...newTourData, [name]: value });
  };

  const handleCancel = () => {
    setNewTourData(newTourDataDefaultState);
    setErrors(defaultErrorsState);
  };

  const handleConfirm = async () => {
    setLoading(true);

    const newErrorsState = {
      ...defaultErrorsState,
    };

    if (!title.length) newErrorsState.title = true;
    if (images.length < 4) newErrorsState.images = true;
    if (!duration) newErrorsState.duration = true;
    if (difficulty.id === "null") newErrorsState.difficulty = true;
    if (!location?.length) newErrorsState.location = true;
    if (!categories.length) newErrorsState.categories = true;
    if (!summary?.length) newErrorsState.summary = true;
    // if (!tourGuides?.length) newErrorsState.tourGuides = true;
    if (
      !tourGuidesList.find(
        (guide) =>
          guide.role === "lead-guide" &&
          tourGuides.find((tourGuide) => tourGuide.id === guide._id)
      )
    )
      newErrorsState.tourGuides = true;
    if (!itinerary.length) newErrorsState.itinerary = true;
    // if (!availabilities.length) newErrorsState.availabilities = true;
    if (!address?.length) newErrorsState.address = true;

    if (
      title.length &&
      images.length >= 4 &&
      duration &&
      difficulty.id !== "null" &&
      location?.length &&
      categories.length &&
      summary?.length &&
      tourGuides.length &&
      itinerary.length &&
      // availabilities.length &&
      address?.length
    ) {
      const response = await createTour(newTourData);
      console.log(response);
      if (response.status === 201) setNewTourData(newTourDataDefaultState);
      else {
        if (response.message.includes("E11000")) {
          newErrorsState.generalMessage = "This tour title is already used";
          newErrorsState.title = true;
        } else {
          newErrorsState.generalMessage = response.message;
        }
      }
    } else {
      newErrorsState.generalMessage = "Information is missing";
    }
    setErrors(newErrorsState);
    setLoading(false);
  };

  return (
    <AddTourContainer>
      <AddTourTitle
        title={title}
        handleChange={handleChange}
        error={errors.title}
      />
      <AddTourImages
        images={images}
        handleChange={handleChange}
        error={errors.images}
      />
      <AddTourDetails
        duration={duration}
        difficulty={difficulty}
        location={location}
        categories={categories}
        summary={summary}
        tourGuides={tourGuides}
        tourGuidesList={tourGuidesList}
        handleChange={handleChange}
        durationError={errors.duration}
        difficultyError={errors.difficulty}
        locationError={errors.location}
        categoriesError={errors.categories}
        tourGuidesError={errors.tourGuides}
        summaryError={errors.summary}
      />
      <AddTourItinerary
        stops={itinerary}
        handleChange={handleChange}
        error={errors.itinerary}
      />
      <AddTourCalendar
        availabilities={availabilities}
        handleChange={handleChange}
      />
      <AddTourPracticalInfos
        address={address}
        additionalInfo={additionalInfo}
        handleChange={handleChange}
        addressError={errors.address}
      />
      <AddTourButtons>
        <AddTourButtonsWrapper>
          <CancelButton>
            <Button
              buttonType={BUTTON_TYPE_CLASSES.cancel}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </CancelButton>
          <MainButton>
            <CheckBoxes
              options={[
                {
                  value: "Show the tour to users (can be changed later)",
                  id: "hidden",
                },
              ]}
              selection={
                hidden
                  ? []
                  : [
                      {
                        value: "Show the tour to users (can be changed later)",
                        id: "hidden",
                      },
                    ]
              }
              handler={() => {
                handleChange(!hidden, TOUR_DATA.hidden);
              }}
            />
            <Button onClick={handleConfirm}>
              {loading ? <Spinner /> : "Add Tour"}
            </Button>
            <ErrorMessage>{errors.generalMessage}</ErrorMessage>
          </MainButton>
        </AddTourButtonsWrapper>
      </AddTourButtons>
    </AddTourContainer>
  );
};

export default AddTour;
