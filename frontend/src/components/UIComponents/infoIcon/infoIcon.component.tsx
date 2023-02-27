import { FC } from "react";
import {
  BigGreenLocationIcon,
  BigOrangeLocationIcon,
  CategoryIcon,
  DateIcon,
  DifficultyIcon,
  DurationIcon,
  GroupIcon,
  LocationIcon,
  TimeIcon,
} from "./infoIcon.style";

export enum INFO_ICON_TYPE_CLASSES {
  location = "location",
  difficulty = "difficulty",
  duration = "duration",
  group = "group",
  locationBigGreen = "locationBigGreen",
  locationBigOrange = "locationBigOrange",
  date = "date",
  time = "time",
  category = "category",
}

const getIcon = (
  iconType = INFO_ICON_TYPE_CLASSES.location
): typeof LocationIcon =>
  ({
    [INFO_ICON_TYPE_CLASSES.location]: LocationIcon,
    [INFO_ICON_TYPE_CLASSES.difficulty]: DifficultyIcon,
    [INFO_ICON_TYPE_CLASSES.duration]: DurationIcon,
    [INFO_ICON_TYPE_CLASSES.group]: GroupIcon,
    [INFO_ICON_TYPE_CLASSES.locationBigGreen]: BigGreenLocationIcon,
    [INFO_ICON_TYPE_CLASSES.locationBigOrange]: BigOrangeLocationIcon,
    [INFO_ICON_TYPE_CLASSES.date]: DateIcon,
    [INFO_ICON_TYPE_CLASSES.time]: TimeIcon,
    [INFO_ICON_TYPE_CLASSES.category]: CategoryIcon,
  }[iconType]);

export type InfoIconProps = {
  iconType?: INFO_ICON_TYPE_CLASSES;
};

const InfoIcon: FC<InfoIconProps> = ({ iconType }) => {
  const CustomIcon = getIcon(iconType);
  return <CustomIcon />;
};

export default InfoIcon;
