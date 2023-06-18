import styled from "styled-components";

import { ReactComponent as BookingsSVG } from "../../../assets/bookings-icon.svg";
import { ReactComponent as ReviewsSVG } from "../../../assets/star-regular.svg";
import { ReactComponent as MapSVG } from "../../../assets/map.svg";
import { ReactComponent as UsersSVG } from "../../../assets/users.svg";
import { ReactComponent as HikerSVG } from "../../../assets/person-hiking-solid.svg";
import { ReactComponent as DollarSVG } from "../../../assets/dollar-icon.svg";
import { ReactComponent as StartSVG } from "../../../assets/starting-flag-icon.svg";

export const BookingsIcon = styled(BookingsSVG)`
  width: 2.8rem;
  height: 2.8rem;
  .path {
    fill: #cc704b;
  }
`;

export const ReviewsIcon = styled(ReviewsSVG)`
  width: 2.8rem;
  height: 2.8rem;
  .path {
    fill: #cc704b;
  }
`;

export const ToursIcon = styled(MapSVG)`
  width: 2.8rem;
  height: 2.8rem;

  .path {
    stroke: #cc704b;
  }
`;
export const UsersIcon = styled(UsersSVG)`
  width: 2.8rem;
  height: 2.8rem;

  .path {
    stroke: #cc704b;
  }
`;
export const HikerIcon = styled(HikerSVG)`
  width: 2.8rem;
  height: 2.8rem;

  .path {
    fill: none;
    stroke-width: 28;
    stroke: #cc704b;
  }
`;

export const DollarIcon = styled(DollarSVG)`
  width: 2.8rem;
  height: 2.8rem;
  .path {
    fill: #cc704b;
  }
`;

export const StartIcon = styled(StartSVG)`
  width: 2.8rem;
  height: 2.8rem;
  .path {
    fill: #cc704b;
  }
`;
