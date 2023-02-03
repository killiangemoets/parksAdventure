import {
  BigGreenLocationIcon,
  BigOrangeLocationIcon,
  DateIcon,
  DifficultyIcon,
  DurationIcon,
  GroupIcon,
  LocationIcon,
  TimeIcon,
} from "./infoIcon.style";

export const ICON_TYPE_CLASSES = {
  location: "location",
  difficulty: "difficulty",
  duration: "duration",
  group: "group",
  locationBigGreen: "locationBigGreen",
  locationBigOrange: "locationBigOrange",
  date: "date",
  time: "time",
};

const getIcon = (iconType) =>
  ({
    [ICON_TYPE_CLASSES.location]: LocationIcon,
    [ICON_TYPE_CLASSES.difficulty]: DifficultyIcon,
    [ICON_TYPE_CLASSES.duration]: DurationIcon,
    [ICON_TYPE_CLASSES.group]: GroupIcon,
    [ICON_TYPE_CLASSES.locationBigGreen]: BigGreenLocationIcon,
    [ICON_TYPE_CLASSES.locationBigOrange]: BigOrangeLocationIcon,
    [ICON_TYPE_CLASSES.date]: DateIcon,
    [ICON_TYPE_CLASSES.time]: TimeIcon,
  }[iconType]);

const InfoIcon = ({ iconType }) => {
  const CustomIcon = getIcon(iconType);
  return <CustomIcon />;
};

export default InfoIcon;
