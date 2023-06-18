import { FC } from "react";
import {
  BookingsIcon,
  ReviewsIcon,
  ToursIcon,
  UsersIcon,
  HikerIcon,
  DollarIcon,
  StartIcon,
} from "./statIcon.style";

export enum STAT_ICON_TYPE_CLASSES {
  bookings = "bookings",
  reviews = "reviews",
  tours = "tours",
  users = "users",
  hikers = "hikers",
  dollar = "dollar",
  start = "start",
}

const getIcon = (
  iconType = STAT_ICON_TYPE_CLASSES.users
): typeof BookingsIcon =>
  ({
    [STAT_ICON_TYPE_CLASSES.bookings]: BookingsIcon,
    [STAT_ICON_TYPE_CLASSES.reviews]: ReviewsIcon,
    [STAT_ICON_TYPE_CLASSES.tours]: ToursIcon,
    [STAT_ICON_TYPE_CLASSES.users]: UsersIcon,
    [STAT_ICON_TYPE_CLASSES.hikers]: HikerIcon,
    [STAT_ICON_TYPE_CLASSES.dollar]: DollarIcon,
    [STAT_ICON_TYPE_CLASSES.start]: StartIcon,
  }[iconType]);

export type StatIconProps = {
  iconType?: STAT_ICON_TYPE_CLASSES;
};

const StatIcon: FC<StatIconProps> = ({ iconType }) => {
  const CustomIcon = getIcon(iconType);
  return <CustomIcon />;
};

export default StatIcon;
