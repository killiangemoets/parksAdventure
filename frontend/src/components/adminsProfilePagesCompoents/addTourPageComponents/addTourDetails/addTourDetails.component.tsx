import { ChangeEvent, useState } from "react";
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
import DropdownInput, {
  Info,
} from "../../../UIComponents/dropdownInput/dropdownInput.component";
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
import QuickFactDropdown from "./quickFactDropdown.component";
import QuickFactInput, {
  QUICK_FACT_INPUT_TYPE,
} from "./quickFactInput.component";

type defaultQuickFactsFormFieldsProps = {
  duration: number | undefined;
  difficulty: Info;
  groupSize: number | undefined;
  location: string | undefined;
};

const defaultQuickFactsFormFields: defaultQuickFactsFormFieldsProps = {
  duration: undefined,
  difficulty: {
    id: "null",
    value: "Select a difficulty",
  },
  groupSize: undefined,
  location: "",
};

const AddTourDetails = () => {
  const [formFields, setFormFields] =
    useState<defaultQuickFactsFormFieldsProps>(defaultQuickFactsFormFields);
  const { duration, difficulty, groupSize, location } = formFields;
  const [tourGuides, setTourGuides] = useState<Info[]>([]);
  const [summary, setSummary] = useState<string>("");

  const handleChange = (value: number | string | Info | null, name: string) => {
    setFormFields({ ...formFields, [name]: value });
  };

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
                iconType={INFO_ICON_TYPE_CLASSES.duration}
                handleChange={handleChange}
                infoName="Duration"
                type={QUICK_FACT_INPUT_TYPE.number}
                name="duration"
                value={duration}
                addonAfter="day(s)"
                placeholder="Enter a value"
              />
              <QuickFactDropdown
                iconType={INFO_ICON_TYPE_CLASSES.difficulty}
                handleChange={handleChange}
                infoName="Difficulty"
                name="difficulty"
                current={difficulty}
                dropdownList={[
                  { id: "family", value: "Family" },
                  { id: "medium", value: "Medium" },
                  { id: "difficult", value: "Difficult" },
                  { id: "expert", value: "Expert" },
                ]}
              />
              <QuickFactInput
                iconType={INFO_ICON_TYPE_CLASSES.group}
                handleChange={handleChange}
                infoName="Group Size"
                type={QUICK_FACT_INPUT_TYPE.number}
                name="groupSize"
                value={groupSize}
                addonAfter="people"
                placeholder="Enter a value"
              />
              <QuickFactInput
                iconType={INFO_ICON_TYPE_CLASSES.location}
                handleChange={handleChange}
                infoName="Location"
                type={QUICK_FACT_INPUT_TYPE.text}
                name="location"
                value={location}
                placeholder="Add a tour location"
              />
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
            <DropdownInput
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
              handler={handleTourGuides}
            >
              Select Tour Guides
            </DropdownInput>
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
