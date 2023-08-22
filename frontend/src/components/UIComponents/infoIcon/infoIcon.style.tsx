import styled from "styled-components";
import { ReactComponent as PositionSVG } from "../../../assets/icons/location-dot-solid.svg";
import { ReactComponent as TentSVG } from "../../../assets/icons/campground-solid.svg";
import { ReactComponent as DifficultySVG } from "../../../assets/icons/arrow-up-right-dots-solid.svg";
import { ReactComponent as GroupSVG } from "../../../assets/icons/users-solid.svg";
import { ReactComponent as CalendarSVG } from "../../../assets/icons/calendar-regular.svg";
import { ReactComponent as ClockSVG } from "../../../assets/icons/clock-regular.svg";
import { ReactComponent as TagSVG } from "../../../assets/icons/tag.svg";
import { ReactComponent as ListSVG } from "../../../assets/icons/list.svg";
import { ReactComponent as RightChevronSVG } from "../../../assets/icons/chevron-right-solid.svg";
import { ReactComponent as CloseSVG } from "../../../assets/icons/x-solid.svg";
import colors from "../../../colors";

export const LocationIcon = styled(PositionSVG)`
  width: 2rem;
  height: 2rem;

  .path {
    fill: ${colors.primary};
  }
`;

export const DurationIcon = styled(TentSVG)`
  width: 2rem;
  height: 2rem;
  .path {
    fill: ${colors.primary};
  }
`;

export const DifficultyIcon = styled(DifficultySVG)`
  width: 2rem;
  height: 2rem;
  .path {
    fill: ${colors.primary};
  }
`;

export const GroupIcon = styled(GroupSVG)`
  width: 2rem;
  height: 2rem;
  .path {
    fill: ${colors.primary};
  }
`;

export const BigGreenLocationIcon = styled(PositionSVG)`
  width: 2.4rem;
  height: 2.4rem;

  .path {
    fill: ${colors.secondary};
  }
`;

export const BigOrangeLocationIcon = styled(PositionSVG)`
  width: 2.4rem;
  height: 2.4rem;

  .path {
    fill: ${colors.primary};
  }
`;

export const XLGreenLocationIcon = styled(PositionSVG)`
  width: 3.6rem;
  height: 3.6rem;

  .path {
    fill: ${colors.secondary};
  }
`;
export const XLOrangeLocationIcon = styled(PositionSVG)`
  width: 3.6rem;
  height: 3.6rem;

  .path {
    fill: ${colors.primary};
  }
`;

export const XLGreyLocationIcon = styled(PositionSVG)`
  width: 3.6rem;
  height: 3.6rem;

  .path {
    fill: ${colors.grey};
  }
`;

export const DateIcon = styled(CalendarSVG)`
  width: 2rem;
  height: 2rem;
  .path {
    fill: ${colors.primary};
  }
`;
export const TimeIcon = styled(ClockSVG)`
  width: 2rem;
  height: 2rem;
  .path {
    fill: ${colors.primary};
  }
`;

export const CategoryIcon = styled(TagSVG)`
  width: 2rem;
  height: 2rem;
  .path {
    fill: ${colors.primary};
    border: ${colors.primary};
  }
`;

export const ListIcon = styled(ListSVG)`
  width: 2rem;
  height: 2rem;
  .path {
    fill: ${colors.primary};
  }
`;

export const BulletIcon = styled(RightChevronSVG)`
  width: 2rem;
  height: 2rem;
  min-width: 2rem !important;
  min-height: 2rem !important;
  .path {
    fill: ${colors.primary};
  }
`;

export const EmptyIcon = styled(RightChevronSVG)`
  width: 2rem;
  height: 2rem;
  .path {
    fill: rgba(0, 0, 0, 0);
  }
`;

export const CloseIcon = styled(CloseSVG)`
  width: 1.4rem;
  height: 1.4rem;
  cursor: pointer;
  .path {
    fill: ${colors.grey};
    transition: all 0.3s;
  }

  &:hover {
    .path {
      fill: ${colors.primary};
    }
  }
`;
