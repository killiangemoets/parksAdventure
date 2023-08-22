import styled from "styled-components";

import { ReactComponent as BookingsSVG } from "../../../assets/icons/bookings-icon.svg";
import { ReactComponent as ReviewsSVG } from "../../../assets/icons/star-regular.svg";
import { ReactComponent as MapSVG } from "../../../assets/icons/map.svg";
import { ReactComponent as UsersSVG } from "../../../assets/icons/users.svg";
import { ReactComponent as HikerSVG } from "../../../assets/icons/person-hiking-solid.svg";
import { ReactComponent as DollarSVG } from "../../../assets/icons/dollar-icon.svg";
import { ReactComponent as StartSVG } from "../../../assets/icons/starting-flag-icon.svg";
import colors from "../../../colors";

export const BookingsIcon = styled(BookingsSVG)`
  width: 2.8rem;
  height: 2.8rem;
  .path {
    fill: ${colors.primary};
  }
`;

export const ReviewsIcon = styled(ReviewsSVG)`
  width: 2.8rem;
  height: 2.8rem;
  .path {
    fill: ${colors.primary};
  }
`;

export const ToursIcon = styled(MapSVG)`
  width: 2.8rem;
  height: 2.8rem;

  .path {
    stroke: ${colors.primary};
  }
`;
export const UsersIcon = styled(UsersSVG)`
  width: 2.8rem;
  height: 2.8rem;

  .path {
    stroke: ${colors.primary};
  }
`;
export const HikerIcon = styled(HikerSVG)`
  width: 2.8rem;
  height: 2.8rem;

  .path {
    fill: none;
    stroke-width: 28;
    stroke: ${colors.primary};
  }
`;

export const DollarIcon = styled(DollarSVG)`
  width: 2.8rem;
  height: 2.8rem;
  .path {
    fill: ${colors.primary};
  }
`;

export const StartIcon = styled(StartSVG)`
  width: 2.8rem;
  height: 2.8rem;
  .path {
    fill: ${colors.primary};
  }
`;
