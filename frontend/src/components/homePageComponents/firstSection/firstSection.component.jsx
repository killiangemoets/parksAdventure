import Title, {
  TITLE_TYPE_CLASSES,
} from "../../UIComponents/title/title.component";
import {
  ElementIconContainer,
  ElementTitle,
  FirstSecContainer,
  FirstSecElement,
  FirstSectionContentWrapper,
} from "./firstSection.style";

const FirstSection = () => {
  return (
    <FirstSecContainer>
      <Title titleType={TITLE_TYPE_CLASSES.homeSection}>
        Unique Hiking Tours
      </Title>
      <FirstSectionContentWrapper>
        <FirstSecElement>
          <ElementTitle>
            Certified
            <br /> Tour Guides
          </ElementTitle>
          <ElementIconContainer>
            <img src="images/guideIcon.png" alt="tour guide icon" />
          </ElementIconContainer>
        </FirstSecElement>
        <FirstSecElement>
          <ElementTitle>
            Exceptionnal
            <br /> Views
          </ElementTitle>
          <ElementIconContainer>
            <img src="images/viewpointIcon.png" alt="viewpoint icon" />
          </ElementIconContainer>
        </FirstSecElement>
        <FirstSecElement>
          <ElementTitle>
            Fully Planned <br />
            Tours
          </ElementTitle>
          <ElementIconContainer>
            <img src="images/mapIcon.png" alt="map icon" />
          </ElementIconContainer>
        </FirstSecElement>
      </FirstSectionContentWrapper>
    </FirstSecContainer>
  );
};

export default FirstSection;
