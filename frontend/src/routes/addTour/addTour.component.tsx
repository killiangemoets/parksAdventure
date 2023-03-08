import { useState } from "react";
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
  MainButton,
} from "./addTour.style";
import type { Dayjs } from "dayjs";
import type { UploadFile } from "antd/es/upload/interface";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../components/UIComponents/button/button.component";
import CheckBoxes from "../../components/UIComponents/checkBoxes/checkBoxes.component";

export enum TOUR_DATA {
  title = "title",
  images = "images",
  duration = "duration",
  difficulty = "difficulty",
  location = "location",
  categories = "categories",
  summary = "summary",
  tourGuides = "tourGuides",
  itinerary = "itinerary",
  availabilities = "availabilities",
  address = "address",
  additionalInfo = "additionalInfo",
  hidden = "hidden",
}

export type NewTourData = {
  [TOUR_DATA.title]: string;
  [TOUR_DATA.images]: UploadFile[];
  [TOUR_DATA.duration]: number | undefined;
  [TOUR_DATA.difficulty]: Info;
  [TOUR_DATA.location]: string | undefined;
  [TOUR_DATA.categories]: Info[];
  [TOUR_DATA.summary]: string | undefined;
  [TOUR_DATA.tourGuides]: Info[];
  [TOUR_DATA.itinerary]: Stop[];
  [TOUR_DATA.availabilities]: Availability[];
  [TOUR_DATA.address]: string | undefined;
  [TOUR_DATA.additionalInfo]: string[];
  [TOUR_DATA.hidden]: boolean;
};

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

const newTourDataDefaultState: NewTourData = {
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

const AddTour = () => {
  const [newTourData, setNewTourData] = useState<NewTourData>(
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

  const handleChange = (value: NewTourDataValueTypes, name: string) => {
    console.log({ name, value });
    setNewTourData({ ...newTourData, [name]: value });
  };
  return (
    <AddTourContainer>
      <AddTourTitle title={title} handleChange={handleChange} />
      <AddTourImages images={images} handleChange={handleChange} />
      <AddTourDetails
        duration={duration}
        difficulty={difficulty}
        location={location}
        categories={categories}
        summary={summary}
        tourGuides={tourGuides}
        handleChange={handleChange}
      />
      <AddTourItinerary stops={itinerary} handleChange={handleChange} />
      <AddTourCalendar
        availabilities={availabilities}
        handleChange={handleChange}
      />
      <AddTourPracticalInfos
        address={address}
        additionalInfo={additionalInfo}
        handleChange={handleChange}
      />
      <AddTourButtons>
        <AddTourButtonsWrapper>
          <CancelButton>
            <Button buttonType={BUTTON_TYPE_CLASSES.cancel}>Cancel</Button>
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
            <Button>Add Tour</Button>
          </MainButton>
        </AddTourButtonsWrapper>
      </AddTourButtons>
    </AddTourContainer>
  );
};

export default AddTour;
