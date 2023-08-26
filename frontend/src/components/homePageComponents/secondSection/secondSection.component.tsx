import { FC } from "react";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../UIComponents/title/title.component";
import {
  ElementTitle,
  SecondSecContainer,
  SecondSecContainerInside,
  SecondSecElement,
  SecondSecElementLink,
  SecondSecSecondTitle,
  SecondSectionContentWrapper,
  SecondSecTitlesContainer,
} from "./secondSection.style";
import CategoryIcon, { CATEGORY_ICON_TYPES } from "./categoryIcon.component";

export type SecondSectionElementProps = {
  name: string;
  category: CATEGORY_ICON_TYPES;
  link: string;
};

const SecondSectionElement: FC<SecondSectionElementProps> = ({
  name,
  category,
  link,
}) => {
  return (
    <SecondSecElementLink to={link}>
      <SecondSecElement>
        <CategoryIcon category={category} />
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
            category={CATEGORY_ICON_TYPES.family}
            link="/alltours?difficulty=family"
          />
          <SecondSectionElement
            name="Expert Tours"
            category={CATEGORY_ICON_TYPES.expert}
            link="/alltours?difficulty=expert"
          />
          <SecondSectionElement
            name="Mountain Tours"
            category={CATEGORY_ICON_TYPES.mountain}
            link="/alltours?category=mountain"
          />
          <SecondSectionElement
            name="Desert Tours"
            category={CATEGORY_ICON_TYPES.desert}
            link="/alltours?category=desert"
          />
          <SecondSectionElement
            name="10Days+ Tours"
            category={CATEGORY_ICON_TYPES.longTour}
            link="/alltours?duration[gte]=10"
          />
        </SecondSectionContentWrapper>
      </SecondSecContainerInside>
    </SecondSecContainer>
  );
};

export default SecondSection;
