import { FC } from "react";
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

export type SecondSectionElementProps = {
  name: string;
  iconUrl: string;
  link: string;
};

const SecondSectionElement: FC<SecondSectionElementProps> = ({
  name,
  iconUrl,
  link,
}) => {
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
            link="/alltours.difficulty=family"
          />
          <SecondSectionElement
            name="Expert Tours"
            iconUrl="images/advancedTours.png"
            link="/alltours?difficulty=expert"
          />
          <SecondSectionElement
            name="Mountain Tours"
            iconUrl="images/mountainTours.png"
            link="/alltours?category=mountain"
          />
          <SecondSectionElement
            name="Desert Tours"
            iconUrl="images/desertTours.png"
            link="/alltours?category=desert"
          />
          <SecondSectionElement
            name="10Days+ Tours"
            iconUrl="images/longTours.png"
            link="/alltours?duration[gte]=10"
          />
        </SecondSectionContentWrapper>
      </SecondSecContainerInside>
    </SecondSecContainer>
  );
};

export default SecondSection;
