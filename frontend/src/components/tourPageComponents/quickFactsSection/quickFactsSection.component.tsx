import { INFO_ICON_TYPE_CLASSES } from "../../UIComponents/infoIcon/infoIcon.component";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../UIComponents/title/title.component";
import QuickFact from "../quickFact/quickFact.component";
import {
  QuickFacts,
  QuickFactsSectionContainer,
} from "./quickFactsSection.style";

const QuickFactsSection = () => {
  return (
    <QuickFactsSectionContainer>
      <Title titleType={TITLE_TYPE_CLASSES.section}>Quick Facts</Title>
      <QuickFacts>
        <QuickFact
          iconType={INFO_ICON_TYPE_CLASSES.duration}
          name={"Duration"}
          info={"7 Days"}
        />
        <QuickFact
          iconType={INFO_ICON_TYPE_CLASSES.difficulty}
          name={"Difficulty"}
          info={"Medium"}
        />
        <QuickFact
          iconType={INFO_ICON_TYPE_CLASSES.location}
          name={"Location"}
          info={"Banff, Canada"}
        />
        <QuickFact
          iconType={INFO_ICON_TYPE_CLASSES.category}
          name={"Categories"}
          info={"Mountain, Snow"}
        />
        <QuickFact
          iconType={INFO_ICON_TYPE_CLASSES.group}
          name={"Group Size"}
          info={"25 people"}
        />
      </QuickFacts>
    </QuickFactsSectionContainer>
  );
};

export default QuickFactsSection;
