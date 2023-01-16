import Title, {
  TITLE_TYPE_CLASSES,
} from "../../UIComponents/title/title.component";
import TourGuide from "../tourGuide/tourGuide.component";
import {
  TourGuides,
  TourGuidesSectionContainer,
} from "./tourGuidesSection.style";

const TourGuidesSection = () => {
  return (
    <TourGuidesSectionContainer>
      <Title titleType={TITLE_TYPE_CLASSES.section}>Your Tour Guides</Title>
      <TourGuides>
        <TourGuide
          pictureUrl="images/desert.jpg"
          position="Lead Guide"
          name="David Goggins"
        />
        <TourGuide
          pictureUrl="images/desert.jpg"
          position="Tour Guide"
          name="Kate Morrison"
        />
        <TourGuide position="Tour Guide" name="Peter Parker" />
      </TourGuides>
    </TourGuidesSectionContainer>
  );
};

export default TourGuidesSection;
