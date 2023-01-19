import styled from "styled-components";

import { ReactComponent as PositionSVG } from "../../../assets/location-dot-solid.svg";
import { ReactComponent as TentSVG } from "../../../assets/campground-solid.svg";
import { ReactComponent as DifficultySVG } from "../../../assets/arrow-up-right-dots-solid.svg";
import { ReactComponent as GroupSVG } from "../../../assets/users-solid.svg";

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
