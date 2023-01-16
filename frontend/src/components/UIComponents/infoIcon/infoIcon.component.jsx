import {
  DifficultyIcon,
  DurationIcon,
  GroupIcon,
  LocationIcon,
} from "./infoIcon.style";

export const ICON_TYPE_CLASSES = {
  location: "location",
  difficulty: "difficulty",
  duration: "duration",
  group: "group",
};

const getIcon = (iconType) =>
  ({
    [ICON_TYPE_CLASSES.location]: LocationIcon,
    [ICON_TYPE_CLASSES.difficulty]: DifficultyIcon,
    [ICON_TYPE_CLASSES.duration]: DurationIcon,
    [ICON_TYPE_CLASSES.group]: GroupIcon,
  }[iconType]);

const InfoIcon = ({ iconType }) => {
  const CustomIcon = getIcon(iconType);
  return <CustomIcon />;
};

export default InfoIcon;
