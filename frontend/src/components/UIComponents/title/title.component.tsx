import { FC } from "react";
import {
  HomeSectionTitle,
  HomeSubSectionTitle,
  MainTitle,
  SectionTitle,
  ThirdTitle,
} from "./title.style";

export enum TITLE_TYPE_CLASSES {
  main = "main",
  section = "section",
  third = "third",
  homeSection = "homeSection",
  homeSubSection = "homeSubSection",
}

const getTitle = (titleType = TITLE_TYPE_CLASSES.main): typeof MainTitle =>
  ({
    [TITLE_TYPE_CLASSES.main]: MainTitle,
    [TITLE_TYPE_CLASSES.section]: SectionTitle,
    [TITLE_TYPE_CLASSES.third]: ThirdTitle,
    [TITLE_TYPE_CLASSES.homeSection]: HomeSectionTitle,
    [TITLE_TYPE_CLASSES.homeSubSection]: HomeSubSectionTitle,
  }[titleType]);

export type TitleProps = {
  titleType?: TITLE_TYPE_CLASSES;
  children: React.ReactNode;
};

const Title: FC<TitleProps> = ({ titleType, children }) => {
  const CustomTitle = getTitle(titleType);
  return <CustomTitle>{children}</CustomTitle>;
};

export default Title;
