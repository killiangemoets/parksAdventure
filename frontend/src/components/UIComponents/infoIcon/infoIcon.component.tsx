import { FC } from "react";
import {
  BigGreenLocationIcon,
  BigOrangeLocationIcon,
  BulletIcon,
  CategoryIcon,
  CloseIcon,
  DateIcon,
  DifficultyIcon,
  DurationIcon,
  EmptyIcon,
  GroupIcon,
  ListIcon,
  LocationIcon,
  TimeIcon,
  XLGreenLocationIcon,
  XLGreyLocationIcon,
  XLOrangeLocationIcon,
} from "./infoIcon.style";

export enum INFO_ICON_TYPE_CLASSES {
  location = "location",
  difficulty = "difficulty",
  duration = "duration",
  group = "group",
  locationBigGreen = "locationBigGreen",
  locationBigOrange = "locationBigOrange",
  locationXLGreen = "locationXLGreen",
  locationXLOrange = "locationXLOrange",
  locationXLGrey = "locationXLGrey",
  date = "date",
  time = "time",
  category = "category",
  list = "list",
  bullet = "bullet",
  empty = "empty",
  close = "close",
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
    [INFO_ICON_TYPE_CLASSES.locationXLGreen]: XLGreenLocationIcon,
    [INFO_ICON_TYPE_CLASSES.locationXLOrange]: XLOrangeLocationIcon,
    [INFO_ICON_TYPE_CLASSES.locationXLGrey]: XLGreyLocationIcon,
    [INFO_ICON_TYPE_CLASSES.date]: DateIcon,
    [INFO_ICON_TYPE_CLASSES.time]: TimeIcon,
    [INFO_ICON_TYPE_CLASSES.category]: CategoryIcon,
    [INFO_ICON_TYPE_CLASSES.list]: ListIcon,
    [INFO_ICON_TYPE_CLASSES.bullet]: BulletIcon,
    [INFO_ICON_TYPE_CLASSES.empty]: EmptyIcon,
    [INFO_ICON_TYPE_CLASSES.close]: CloseIcon,
  }[iconType]);

export type InfoIconProps = {
  iconType?: INFO_ICON_TYPE_CLASSES;
};

const InfoIcon: FC<InfoIconProps> = ({ iconType }) => {
  const CustomIcon = getIcon(iconType);
  return <CustomIcon />;
};

export default InfoIcon;
