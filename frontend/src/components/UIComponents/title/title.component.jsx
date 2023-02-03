import {
  HomeSectionTitle,
  HomeSubSectionTitle,
  MainTitle,
  SectionTitle,
  ThirdTitle,
} from "./title.style";

export const TITLE_TYPE_CLASSES = {
  main: "main",
  section: "section",
  third: "third",
  homeSection: "homeSection",
  homeSubSection: "homeSubSection",
};

const getTitle = (titleType) =>
  ({
    [TITLE_TYPE_CLASSES.main]: MainTitle,
    [TITLE_TYPE_CLASSES.section]: SectionTitle,
    [TITLE_TYPE_CLASSES.third]: ThirdTitle,
    [TITLE_TYPE_CLASSES.homeSection]: HomeSectionTitle,
    [TITLE_TYPE_CLASSES.homeSubSection]: HomeSubSectionTitle,
  }[titleType]);

const Title = ({ titleType, children }) => {
  const CustomTitle = getTitle(titleType);
  return <CustomTitle>{children}</CustomTitle>;
};

export default Title;
