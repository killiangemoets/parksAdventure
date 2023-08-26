import { useEffect, useState } from "react";
import AddTourCalendar from "../../../components/adminsProfilePagesComponents/addTourPageComponents/addTourCalendar/addTourCalendar.component";
import AddTourDetails from "../../../components/adminsProfilePagesComponents/addTourPageComponents/addTourDetails/addTourDetails.component";
import AddTourImages from "../../../components/adminsProfilePagesComponents/addTourPageComponents/addTourImages/addTourImages.component";
import AddTourItinerary from "../../../components/adminsProfilePagesComponents/addTourPageComponents/addTourItinerary/addTourItinerary.component";
import AddTourPracticalInfos from "../../../components/adminsProfilePagesComponents/addTourPageComponents/addTourPracticalInfos/addTourPracticalInfos.component";
import AddTourTitle from "../../../components/adminsProfilePagesComponents/addTourPageComponents/addTourTitle/addTourTitle.component";
import {
  AddTourButtons,
  AddTourButtonsWrapper,
  AddTourContainer,
  CancelButton,
  ErrorMessage,
  MainButton,
} from "./adminAddTour.style";
import type { Dayjs } from "dayjs";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../../components/UIComponents/button/button.component";
import CheckBoxes from "../../../components/UIComponents/checkBoxes/checkBoxes.component";
import {
  TCreateAvailability,
  TCreateStop,
  CreateTourData,
  CREATE_TOUR_DATA,
  TUploadTourImage,
  TAvailability,
} from "../../../types/tour";
import {
  createTour,
  getTourGuides,
  updateTour,
} from "../../../api/tour-requests";
import Spinner from "../../../components/UIComponents/spinner/spinner.component";
import { TUser, USER_ROLE_TYPES } from "../../../types/user";
import { useDispatch, useSelector } from "react-redux";
import { selectUserRole } from "../../../store/user/user.selector";
import { AppDispatch } from "../../../store/store";
import { useNavigate, useParams } from "react-router-dom";
import { fetchTourAsync } from "../../../store/tour/tour.action";
import {
  selectTour,
  selectTourCurrentAvailabilities,
} from "../../../store/tour/tour.selector";
import getTourDataInEditFormat from "../../../utils/dataManipulation/getTourDataInEditFormat";

export type NewTourDataValueTypes =
  | string
  | string[]
  | number
  | Info
  | Info[]
  | TCreateStop[]
  | TCreateAvailability[]
  | TUploadTourImage[]
  | undefined
  | null
  | boolean
  | Dayjs;

const newTourDataDefaultState: CreateTourData = {
  name: "",
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
  locations: [],
  availabilities: [],
  address: "",
  additionalInfo: [],
  hidden: false,
};

type ErrorsProps = {
  name: boolean;
  images: boolean;
  duration: boolean;
  difficulty: boolean;
  location: boolean;
  categories: boolean;
  summary: boolean;
  tourGuides: boolean;
  locations: boolean;
  address: boolean;
  generalMessage: string;
};

const defaultErrorsState: ErrorsProps = {
  name: false,
  images: false,
  duration: false,
  difficulty: false,
  location: false,
  categories: false,
  summary: false,
  tourGuides: false,
  locations: false,
  address: false,
  generalMessage: "",
};

type TourSlugRouteParams = {
  slug: string;
};

const AdminAddTour = () => {
  const dispatch: AppDispatch = useDispatch();
  const { slug } = useParams<
    keyof TourSlugRouteParams
  >() as TourSlugRouteParams;
  const [tourData, setTourData] = useState<CreateTourData>(
    newTourDataDefaultState
  );
  const {
    name,
    images,
    duration,
    difficulty,
    location,
    categories,
    summary,
    tourGuides,
    locations,
    availabilities,
    address,
    additionalInfo,
    hidden,
  } = tourData;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorsProps>(defaultErrorsState);
  const [tourGuidesList, setTourGuidesList] = useState<TUser[]>([]);
  const tourCurrentAvailabilities = useSelector(
    selectTourCurrentAvailabilities
  );
  const [currentAvailabilities, setCurrentAvailabilities] =
    useState<TAvailability[]>();
  const userRole = useSelector(selectUserRole);
  const tour = useSelector(selectTour);

  useEffect(() => {
    if (!slug || tour) return;
    dispatch(fetchTourAsync(slug));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    if (
      slug &&
      tourCurrentAvailabilities &&
      tourCurrentAvailabilities?.length > 0
    )
      setCurrentAvailabilities(tourCurrentAvailabilities);
  }, [slug, tourCurrentAvailabilities]);

  useEffect(() => {
    const geTourToUploadData = async () => {
      if (!slug || !tour) return;
      const editTourData = await getTourDataInEditFormat(tour);
      setTourData(editTourData);
    };

    geTourToUploadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tour]);

  useEffect(() => {
    const loadTourGuides = async () => {
      const response = await getTourGuides();
      if (response && response.status === "success") {
        setTourGuidesList(response.data);
      }
    };
    loadTourGuides();
  }, []);

  const handleChange = (value: NewTourDataValueTypes, name: string) => {
    setTourData({ ...tourData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleCancel = () => {
    if (slug) navigate(`/tour/${slug}`);
    else {
      setTourData(newTourDataDefaultState);
      setErrors(defaultErrorsState);
    }
  };

  const handleConfirm = async () => {
    setLoading(true);

    const newErrorsState = {
      ...defaultErrorsState,
    };

    if (!name.length) newErrorsState.name = true;
    if (images.length < 4) newErrorsState.images = true;
    if (!duration) newErrorsState.duration = true;
    if (difficulty.id === "null") newErrorsState.difficulty = true;
    if (!location?.length) newErrorsState.location = true;
    if (!categories.length) newErrorsState.categories = true;
    if (!summary?.length) newErrorsState.summary = true;
    if (
      !tourGuidesList.find(
        (guide) =>
          guide.role === "lead-guide" &&
          tourGuides.find((tourGuide) => tourGuide.id === guide.id)
      )
    )
      newErrorsState.tourGuides = true;
    if (!locations.length) newErrorsState.locations = true;
    if (!address?.length) newErrorsState.address = true;

    if (
      name.length &&
      images.length >= 4 &&
      duration &&
      difficulty.id !== "null" &&
      location?.length &&
      categories.length &&
      summary?.length &&
      tourGuidesList.find(
        (guide) =>
          guide.role === "lead-guide" &&
          tourGuides.find((tourGuide) => tourGuide.id === guide.id)
      ) &&
      locations.length &&
      address?.length
    ) {
      const response =
        slug && tour?._id
          ? await updateTour(tourData, tour?._id)
          : await createTour(tourData);
      if (response && response.status === "success") {
        navigate(`/tour/${response.data.data.slug}`);
      } else {
        if (response && response.message.includes("E11000")) {
          newErrorsState.generalMessage = "This tour title is already used";
          newErrorsState.name = true;
        } else if (response && response.message) {
          newErrorsState.generalMessage = response.message;
        } else {
          newErrorsState.generalMessage =
            "An error occured. Please refresh the page and try again!";
        }
      }
    } else {
      newErrorsState.generalMessage = "Information is missing";
    }
    setErrors(newErrorsState);
    setLoading(false);
  };

  return (
    <AddTourContainer
      paddingTop={Boolean(slug && userRole === USER_ROLE_TYPES.ADMIN)}>
      <AddTourTitle
        title={name}
        handleChange={handleChange}
        error={errors.name}
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
        stops={locations}
        handleChange={handleChange}
        error={errors.locations}
      />
      <AddTourCalendar
        availabilities={availabilities}
        handleChange={handleChange}
        tourCurrentAvailabilities={currentAvailabilities}
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
              onClick={handleCancel}>
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
                handleChange(!hidden, CREATE_TOUR_DATA.hidden);
              }}
            />
            <Button onClick={handleConfirm}>
              {loading ? <Spinner /> : slug ? "Update Tour" : "Add Tour"}
            </Button>
            <ErrorMessage>{errors.generalMessage}</ErrorMessage>
          </MainButton>
        </AddTourButtonsWrapper>
      </AddTourButtons>
    </AddTourContainer>
  );
};

export default AdminAddTour;
