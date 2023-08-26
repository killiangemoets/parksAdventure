import { FC } from "react";
import {
  DesertTourIcon,
  ExpertTourIcon,
  FamilyTourIcon,
  LongTourIcon,
  MountainTourIcon,
} from "./categoryIcon.style";

export enum CATEGORY_ICON_TYPES {
  family = "family",
  expert = "expert",
  mountain = "mountain",
  desert = "desert",
  longTour = "longTour",
}

const getIcon = (
  category = CATEGORY_ICON_TYPES.family
): typeof FamilyTourIcon =>
  ({
    [CATEGORY_ICON_TYPES.family]: FamilyTourIcon,
    [CATEGORY_ICON_TYPES.expert]: ExpertTourIcon,
    [CATEGORY_ICON_TYPES.mountain]: MountainTourIcon,
    [CATEGORY_ICON_TYPES.desert]: DesertTourIcon,
    [CATEGORY_ICON_TYPES.longTour]: LongTourIcon,
  }[category]);

export type CategoryIconProps = {
  category?: CATEGORY_ICON_TYPES;
};

const CategoryIcon: FC<CategoryIconProps> = ({ category }) => {
  const CustomIcon = getIcon(category);
  return <CustomIcon />;
};

export default CategoryIcon;
