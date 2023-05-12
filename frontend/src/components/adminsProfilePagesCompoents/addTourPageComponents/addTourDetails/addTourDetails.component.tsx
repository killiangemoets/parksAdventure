import { ChangeEvent, FC, useEffect, useState } from "react";
import {
  QuickFacts,
  QuickFactsSectionContainer,
} from "../../../tourPageComponents/quickFactsSection/quickFactsSection.style";
import { SummarySectionContainer } from "../../../tourPageComponents/summarySection/summarySection.style";
import TourGuide from "../../../tourPageComponents/tourGuide/tourGuide.component";
import { TourGuides } from "../../../tourPageComponents/tourGuidesSection/tourGuidesSection.style";
import {
  TourInfosContainer,
  TourInfosLeft,
  TourInfosLeftWrapper,
  TourInfosRight,
} from "../../../tourPageComponents/tourInfos/tourInfos.style";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../../UIComponents/button/button.component";
import Dropdown, {
  DROPDOWN_TYPE_CLASSES,
} from "../../../UIComponents/dropdown/dropdown.component";
import { INFO_ICON_TYPE_CLASSES } from "../../../UIComponents/infoIcon/infoIcon.component";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../../UIComponents/title/title.component";
import {
  CloseIcon,
  ErrorMessage,
  SummaryInput,
  TourGuideSelected,
  TourGuidesSelectSectionContainer,
} from "./addTourDetails.style";
import QuickFactInput, {
  QUICK_FACT_INPUT_TYPE,
} from "../quickFactInput/quickFactInput.component";
import { NewTourDataValueTypes } from "../../../../routes/adminRoutes/adminAddTour/adminAddTour.component";
import {
  categoriesInfoList,
  CREATE_TOUR_DATA,
  difficultiesInfoList,
} from "../../../../types/tour";
import { TUser } from "../../../../types/user";

export type AddTourDetailsProps = {
  duration: number | undefined;
  difficulty: Info;
  location: string | undefined;
  categories: Info[];
  summary: string | undefined;
  tourGuides: Info[];
  tourGuidesList: TUser[];
  handleChange: (value: NewTourDataValueTypes, name: string) => void;
  durationError: boolean;
  difficultyError: boolean;
  locationError: boolean;
  categoriesError: boolean;
  tourGuidesError: boolean;
  summaryError: boolean;
};

const AddTourDetails: FC<AddTourDetailsProps> = ({
  duration,
  difficulty,
  location,
  categories,
  summary,
  tourGuides,
  tourGuidesList,
  handleChange,
  durationError,
  difficultyError,
  locationError,
  categoriesError,
  tourGuidesError,
  summaryError,
}) => {
  const [categoriesString, setCategoriesString] = useState<string>("");
  const [unselectedTourGuides, setUnselectedTourGuides] =
    useState<TUser[]>(tourGuidesList);

  useEffect(() => {
    const newUnselectedTourGuides = tourGuidesList.filter(
      (guide) =>
        !tourGuides.find(
          (selectedTourGuide) => selectedTourGuide.id === guide.id
        )
    );
    setUnselectedTourGuides(newUnselectedTourGuides);
  }, [tourGuides, tourGuidesList]);

  useEffect(() => {
    let newCategoriesString = categories
      .reduce((acc, curr) => acc + curr.value + ", ", "")
      .slice(0, -2);

    if (newCategoriesString.length > 18)
      newCategoriesString = newCategoriesString.slice(0, 18) + "...";

    setCategoriesString(newCategoriesString);
  }, [categories]);

  const handleTourGuides = (newTourGuide: Info) => {
    handleChange([...tourGuides, newTourGuide], CREATE_TOUR_DATA.tourGuides);
  };

  const handleChangeSummary = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = event.target;
    if (value.length >= 700) return;
    handleChange(value, name);
  };

  const removeTourGuide = (index: number) => {
    const newTourGuides = [
      ...tourGuides.slice(0, index),
      ...tourGuides.slice(index + 1),
    ];
    handleChange(newTourGuides, CREATE_TOUR_DATA.tourGuides);
  };

  return (
    <TourInfosContainer>
      <TourInfosLeft>
        <TourInfosLeftWrapper>
          <QuickFactsSectionContainer>
            <Title titleType={TITLE_TYPE_CLASSES.section}>Quick Facts</Title>
            <QuickFacts>
              <QuickFactInput
                type={QUICK_FACT_INPUT_TYPE.number}
                iconType={INFO_ICON_TYPE_CLASSES.duration}
                handleChange={handleChange}
                infoName="Duration"
                name={CREATE_TOUR_DATA.duration}
                value={duration}
                addonAfter="day(s)"
                placeholder="Enter a value"
                min={1}
                error={durationError}
              />
              <QuickFactInput
                type={QUICK_FACT_INPUT_TYPE.dropdown}
                iconType={INFO_ICON_TYPE_CLASSES.difficulty}
                handleChange={handleChange}
                infoName="Difficulty"
                name={CREATE_TOUR_DATA.difficulty}
                current={difficulty}
                dropdownList={difficultiesInfoList}
                error={difficultyError}
              />
              <QuickFactInput
                type={QUICK_FACT_INPUT_TYPE.text}
                iconType={INFO_ICON_TYPE_CLASSES.location}
                handleChange={handleChange}
                infoName="Location"
                name={CREATE_TOUR_DATA.location}
                value={location}
                placeholder="Add a tour location"
                maxLength={40}
                error={locationError}
              />
              <QuickFactInput
                type={QUICK_FACT_INPUT_TYPE.dropdown}
                dropdownType={DROPDOWN_TYPE_CLASSES.checkBoxes}
                allowSelectAll={true}
                iconType={INFO_ICON_TYPE_CLASSES.category}
                handleChange={handleChange}
                infoName="Categories"
                name={CREATE_TOUR_DATA.categories}
                selection={categories}
                options={categoriesInfoList}
                error={categoriesError}>
                {categories.length > 0 ? (
                  <p>{categoriesString}</p>
                ) : (
                  <p>Select Categories</p>
                )}
              </QuickFactInput>
            </QuickFacts>
          </QuickFactsSectionContainer>
          <TourGuidesSelectSectionContainer>
            <Title titleType={TITLE_TYPE_CLASSES.section}>Tour Guides</Title>
            <TourGuides>
              {tourGuides.map((tourGuide, i) => (
                <TourGuideSelected key={i}>
                  {tourGuide.value}
                  <Button
                    buttonType={BUTTON_TYPE_CLASSES.empty}
                    onClick={() => {
                      removeTourGuide(i);
                    }}>
                    <CloseIcon />
                  </Button>
                </TourGuideSelected>
              ))}
            </TourGuides>
            <Dropdown
              dropdownType={DROPDOWN_TYPE_CLASSES.input}
              list={unselectedTourGuides.map((tourGuide) => {
                return {
                  id: tourGuide.id,
                  value: (
                    <TourGuide
                      pictureUrl={tourGuide.photo}
                      position={
                        tourGuide.role === "guide" ? "Guide" : "Lead Guide"
                      }
                      name={`${tourGuide.firstname} ${tourGuide.lastname}`}
                    />
                  ),
                };
              })}
              current={{ id: "null", value: "" }}
              handleInput={handleTourGuides}
              keeOpenAfterSelection={true}>
              Select Tour Guides
            </Dropdown>
            <ErrorMessage>
              {tourGuidesError
                ? "A tour must have at least one LEAD guide"
                : ""}
            </ErrorMessage>
          </TourGuidesSelectSectionContainer>
        </TourInfosLeftWrapper>
      </TourInfosLeft>
      <TourInfosRight>
        <SummarySectionContainer>
          <Title titleType={TITLE_TYPE_CLASSES.section}>About the Tour</Title>
          <SummaryInput
            onChange={handleChangeSummary}
            name="summary"
            value={summary}
            placeholder="Add a tour summary"
            error={summaryError}
          />
        </SummarySectionContainer>
      </TourInfosRight>
    </TourInfosContainer>
  );
};
export default AddTourDetails;
