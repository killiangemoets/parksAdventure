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
import { NewTourDataValueTypes } from "../../../../routes/addTour/addTour.component";
import { TOUR_DATA } from "../../../../types/tour";

const categoriesList: Info[] = [
  { value: "Mountain", id: "mountain" },
  { value: "Desert", id: "desert" },
  { value: "Snow", id: "snow" },
  { value: "Cities", id: "cities" },
  { value: "Sea", id: "sea" },
  { value: "Lakes", id: "lakes" },
];

const difficultiesList: Info[] = [
  { id: "family", value: "Family" },
  { id: "medium", value: "Medium" },
  { id: "difficult", value: "Difficult" },
  { id: "expert", value: "Expert" },
];

export type AddTourDetailsProps = {
  duration: number | undefined;
  difficulty: Info;
  location: string | undefined;
  categories: Info[];
  summary: string | undefined;
  tourGuides: Info[];
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
  handleChange,
  durationError,
  difficultyError,
  locationError,
  categoriesError,
  tourGuidesError,
  summaryError,
}) => {
  const [categoriesString, setCategoriesString] = useState<string>("");

  useEffect(() => {
    let newCategoriesString = categories
      .reduce((acc, curr) => acc + curr.value + ", ", "")
      .slice(0, -2);

    if (newCategoriesString.length > 18)
      newCategoriesString = newCategoriesString.slice(0, 18) + "...";

    setCategoriesString(newCategoriesString);
  }, [categories]);

  const handleTourGuides = (newTourGuide: Info) => {
    handleChange([...tourGuides, newTourGuide], TOUR_DATA.tourGuides);
  };

  const handleChangeSummary = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = event.target;
    if (value.length >= 700) return;
    handleChange(value, name);
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
                name={TOUR_DATA.duration}
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
                name={TOUR_DATA.difficulty}
                current={difficulty}
                dropdownList={difficultiesList}
                error={difficultyError}
              />
              <QuickFactInput
                type={QUICK_FACT_INPUT_TYPE.text}
                iconType={INFO_ICON_TYPE_CLASSES.location}
                handleChange={handleChange}
                infoName="Location"
                name={TOUR_DATA.location}
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
                name={TOUR_DATA.categories}
                selection={categories}
                options={categoriesList}
                error={categoriesError}
              >
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
              {tourGuides.map((tourGuides) => (
                <TourGuideSelected>
                  {tourGuides.value}
                  <Button buttonType={BUTTON_TYPE_CLASSES.empty}>
                    <CloseIcon />
                  </Button>
                </TourGuideSelected>
              ))}
            </TourGuides>
            <Dropdown
              dropdownType={DROPDOWN_TYPE_CLASSES.input}
              list={[
                {
                  id: "1",
                  value: (
                    <TourGuide
                      // pictureUrl="images/desert.jpg"
                      position="Lead Guide"
                      name="David Goggins"
                    />
                  ),
                },
                {
                  id: "2",
                  value: (
                    <TourGuide
                      // pictureUrl="images/desert.jpg"
                      position="Tour Guide"
                      name="Kate Morrison"
                    />
                  ),
                },
                {
                  id: "3",
                  value: (
                    <TourGuide
                      // pictureUrl={"images/user.jpg"}
                      position="Tour Guide"
                      name="Peter Parker"
                    />
                  ),
                },
              ]}
              current={{ id: "null", value: "" }}
              handleInput={handleTourGuides}
              keeOpenAfterSelection={true}
            >
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
