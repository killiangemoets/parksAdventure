import { MainTitle, SectionTitle } from "./title.style";

export const TITLE_TYPE_CLASSES = {
  main: "main",
  section: "section",
};

const getTitle = (titleType) =>
  ({
    [TITLE_TYPE_CLASSES.main]: MainTitle,
    [TITLE_TYPE_CLASSES.section]: SectionTitle,
  }[titleType]);

const Title = ({ titleType, children }) => {
  const CustomTitle = getTitle(titleType);
  return <CustomTitle>{children}</CustomTitle>;
};

export default Title;
