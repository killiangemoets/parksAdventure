import styled from "styled-components";

import { ReactComponent as PositionSVG } from "../../../assets/location-dot-solid.svg";
import { ReactComponent as TentSVG } from "../../../assets/campground-solid.svg";
import { ReactComponent as DifficultySVG } from "../../../assets/arrow-up-right-dots-solid.svg";
import { ReactComponent as GroupSVG } from "../../../assets/users-solid.svg";
import { ReactComponent as CalendarSVG } from "../../../assets/calendar-regular.svg";
import { ReactComponent as ClockSVG } from "../../../assets/clock-regular.svg";
import { ReactComponent as TagSVG } from "../../../assets/tag.svg";
import { ReactComponent as ListSVG } from "../../../assets/list.svg";
import { ReactComponent as RightChevronSVG } from "../../../assets/chevron-right-solid.svg";

export const LocationIcon = styled(PositionSVG)`
  width: 2rem;
  height: 2rem;

  .path {
    fill: #cc704b;
  }
`;

export const DurationIcon = styled(TentSVG)`
  width: 2rem;
  height: 2rem;
  .path {
    fill: #cc704b;
  }
`;

export const DifficultyIcon = styled(DifficultySVG)`
  width: 2rem;
  height: 2rem;
  .path {
    fill: #cc704b;
  }
`;

export const GroupIcon = styled(GroupSVG)`
  width: 2rem;
  height: 2rem;
  .path {
    fill: #cc704b;
  }
`;

export const BigGreenLocationIcon = styled(PositionSVG)`
  width: 2.4rem;
  height: 2.4rem;

  .path {
    fill: #506044;
  }
`;

export const BigOrangeLocationIcon = styled(PositionSVG)`
  width: 2.4rem;
  height: 2.4rem;

  .path {
    fill: #cc704b;
  }
`;

export const XLGreenLocationIcon = styled(PositionSVG)`
  width: 3.6rem;
  height: 3.6rem;

  .path {
    fill: #506044;
  }
`;
export const XLOrangeLocationIcon = styled(PositionSVG)`
  width: 3.6rem;
  height: 3.6rem;

  .path {
    fill: #cc704b;
  }
`;

export const XLGreyLocationIcon = styled(PositionSVG)`
  width: 3.6rem;
  height: 3.6rem;

  .path {
    fill: #aaa;
  }
`;

export const DateIcon = styled(CalendarSVG)`
  width: 2rem;
  height: 2rem;
  .path {
    fill: #cc704b;
  }
`;
export const TimeIcon = styled(ClockSVG)`
  width: 2rem;
  height: 2rem;
  .path {
    fill: #cc704b;
  }
`;

export const CategoryIcon = styled(TagSVG)`
  width: 2rem;
  height: 2rem;
  .path {
    fill: #cc704b;
    border: #cc704b;
  }
`;

export const ListIcon = styled(ListSVG)`
  width: 2rem;
  height: 2rem;
  .path {
    fill: #cc704b;
  }
`;

export const BulletIcon = styled(RightChevronSVG)`
  width: 2rem;
  height: 2rem;
  .path {
    fill: #cc704b;
  }
`;

export const EmptyIcon = styled(RightChevronSVG)`
  width: 2rem;
  height: 2rem;
  .path {
    fill: rgba(0, 0, 0, 0);
  }
`;
