import { ICON_TYPE_CLASSES } from "../../UIComponents/infoIcon/infoIcon.component";
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
          iconType={ICON_TYPE_CLASSES.duration}
          name={"Duration"}
          info={"7 Days"}
        />
        <QuickFact
          iconType={ICON_TYPE_CLASSES.difficulty}
          name={"Difficulty"}
          info={"Medium"}
        />
        <QuickFact
          iconType={ICON_TYPE_CLASSES.group}
          name={"Group Size"}
          info={"25 people"}
        />
        <QuickFact
          iconType={ICON_TYPE_CLASSES.location}
          name={"Location"}
          info={"Banff, Canada"}
        />
      </QuickFacts>
    </QuickFactsSectionContainer>
  );
};

export default QuickFactsSection;
