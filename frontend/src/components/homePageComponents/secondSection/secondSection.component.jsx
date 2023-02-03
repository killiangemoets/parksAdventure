import { useState } from "react";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../UIComponents/title/title.component";
import {
  ElementIconContainer,
  ElementTitle,
  SecondSecContainer,
  SecondSecContainerInside,
  SecondSecElement,
  SecondSecElementLink,
  SecondSecSecondTitle,
  SecondSectionContentWrapper,
  SecondSecTitlesContainer,
} from "./secondSection.style";

const SecondSectionElement = ({ name, iconUrl, link }) => {
  return (
    <SecondSecElementLink to={link}>
      <SecondSecElement>
        <ElementIconContainer>
          <img src={iconUrl} alt={name} />
        </ElementIconContainer>
        <ElementTitle>{name}</ElementTitle>
      </SecondSecElement>
    </SecondSecElementLink>
  );
};

const SecondSection = () => {
  return (
    <SecondSecContainer>
      <SecondSecContainerInside>
        <SecondSecTitlesContainer>
          <Title titleType={TITLE_TYPE_CLASSES.homeSection}>Choose Tour</Title>
          <SecondSecSecondTitle>
            Find your next hiking adventure and make it memorable
          </SecondSecSecondTitle>
        </SecondSecTitlesContainer>
        <SecondSectionContentWrapper>
          <SecondSectionElement
            name="Family Tours"
            iconUrl="images/familyTours.png"
            link="/alltours"
          />
          <SecondSectionElement
            name="Advanced Tours"
            iconUrl="images/advancedTours.png"
            link="/alltours"
          />
          <SecondSectionElement
            name="Mountain Tours"
            iconUrl="images/mountainTours.png"
            link="/alltours"
          />
          <SecondSectionElement
            name="Desert Tours"
            iconUrl="images/desertTours.png"
            link="/alltours"
          />
          <SecondSectionElement
            name="10Days+ Tours"
            iconUrl="images/longTours.png"
            link="/alltours"
          />
        </SecondSectionContentWrapper>
      </SecondSecContainerInside>
    </SecondSecContainer>
  );
};

export default SecondSection;
