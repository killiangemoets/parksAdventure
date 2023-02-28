import { ChangeEvent, useEffect, useState } from "react";
import {
  QuickFacts,
  QuickFactsSectionContainer,
} from "../../../tourPageComponents/quickFactsSection/quickFactsSection.style";
import type { Dayjs } from "dayjs";
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
  SummaryInput,
  TourGuideSelected,
  TourGuidesSelectSectionContainer,
} from "./addTourDetails.style";
import QuickFactInput, {
  handleChangeValueType,
  QUICK_FACT_INPUT_TYPE,
} from "../quickFactInput/quickFactInput.component";

type defaultQuickFactsFormFieldsProps = {
  duration: number | undefined;
  difficulty: Info;
  location: string | undefined;
  categories: Info[];
};

const defaultQuickFactsFormFields: defaultQuickFactsFormFieldsProps = {
  duration: undefined,
  difficulty: {
    id: "null",
    value: "Select a difficulty",
  },
  location: "",
  categories: [],
};

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
const AddTourDetails = () => {
  const [formFields, setFormFields] =
    useState<defaultQuickFactsFormFieldsProps>(defaultQuickFactsFormFields);
  const { duration, difficulty, location, categories } = formFields;
  const [tourGuides, setTourGuides] = useState<Info[]>([]);
  const [summary, setSummary] = useState<string>("");
  const [categoriesString, setCategoriesString] = useState<string>("");

  const handleChange = (value: handleChangeValueType, name: string) => {
    setFormFields({ ...formFields, [name]: value });
  };

  useEffect(() => {
    let newCategoriesString = categories
      .reduce((acc, curr) => acc + curr.value + ", ", "")
      .slice(0, -2);

    if (newCategoriesString.length > 18)
      newCategoriesString = newCategoriesString.slice(0, 18) + "...";

    setCategoriesString(newCategoriesString);
  }, [categories]);

  const handleTourGuides = (newTourGuide: Info) => {
    setTourGuides([...tourGuides, newTourGuide]);
  };

  const handleChangeSummary = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setSummary(value);
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
                name="duration"
                value={duration}
                addonAfter="day(s)"
                placeholder="Enter a value"
                min={1}
              />
              <QuickFactInput
                type={QUICK_FACT_INPUT_TYPE.dropdown}
                iconType={INFO_ICON_TYPE_CLASSES.difficulty}
                handleChange={handleChange}
                infoName="Difficulty"
                name="difficulty"
                current={difficulty}
                dropdownList={difficultiesList}
              />
              <QuickFactInput
                type={QUICK_FACT_INPUT_TYPE.text}
                iconType={INFO_ICON_TYPE_CLASSES.location}
                handleChange={handleChange}
                infoName="Location"
                name="location"
                value={location}
                placeholder="Add a tour location"
              />
              <QuickFactInput
                type={QUICK_FACT_INPUT_TYPE.dropdown}
                dropdownType={DROPDOWN_TYPE_CLASSES.checkBoxes}
                allowSelectAll={true}
                iconType={INFO_ICON_TYPE_CLASSES.category}
                handleChange={handleChange}
                infoName="Categories"
                name="categories"
                selection={categories}
                options={categoriesList}
              >
                {categories.length > 0 ? (
                  <p>{categoriesString}</p>
                ) : (
                  <p>Select Categories</p>
                )}
              </QuickFactInput>
              {/* <QuickFactInput
                type={QUICK_FACT_INPUT_TYPE.number}
                iconType={INFO_ICON_TYPE_CLASSES.group}
                handleChange={handleChange}
                infoName="Group Size"
                name="groupSize"
                value={groupSize}
                addonAfter="people"
                placeholder="Enter a value"
                min={1}
              /> */}
            </QuickFacts>
          </QuickFactsSectionContainer>
          <TourGuidesSelectSectionContainer>
            <Title titleType={TITLE_TYPE_CLASSES.section}>Tour Guides</Title>
            <TourGuides>
              {tourGuides.map((tourGuides) => (
                <TourGuideSelected>
                  {tourGuides.value}
                  <Button
                    buttonType={BUTTON_TYPE_CLASSES.empty}
                    // onClick={() => handleClose()}
                  >
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
          </TourGuidesSelectSectionContainer>
        </TourInfosLeftWrapper>
      </TourInfosLeft>
      <TourInfosRight>
        <SummarySectionContainer>
          <Title titleType={TITLE_TYPE_CLASSES.section}>About the Tour</Title>
          <SummaryInput
            onChange={handleChangeSummary}
            value={summary}
            placeholder={"Add a tour summary"}
          />
        </SummarySectionContainer>
      </TourInfosRight>
    </TourInfosContainer>
  );
};
export default AddTourDetails;
