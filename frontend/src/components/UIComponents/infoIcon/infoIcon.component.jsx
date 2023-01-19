import {
  BigGreenLocationIcon,
  BigOrangeLocationIcon,
  DifficultyIcon,
  DurationIcon,
  GroupIcon,
  LocationIcon,
  StartingPoint,
  StopOvergPoint,
} from "./infoIcon.style";

export const ICON_TYPE_CLASSES = {
  location: "location",
  difficulty: "difficulty",
  duration: "duration",
  locationBigGreen: "locationBigGreen",
  locationBigOrange: "locationBigOrange",
};

const getIcon = (iconType) =>
  ({
    [ICON_TYPE_CLASSES.location]: LocationIcon,
    [ICON_TYPE_CLASSES.difficulty]: DifficultyIcon,
    [ICON_TYPE_CLASSES.duration]: DurationIcon,
    [ICON_TYPE_CLASSES.group]: GroupIcon,
    [ICON_TYPE_CLASSES.locationBigGreen]: BigGreenLocationIcon,
    [ICON_TYPE_CLASSES.locationBigOrange]: BigOrangeLocationIcon,
  }[iconType]);

const InfoIcon = ({ iconType }) => {
  const CustomIcon = getIcon(iconType);
  return <CustomIcon />;
};

export default InfoIcon;
