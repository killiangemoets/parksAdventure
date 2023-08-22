import styled from "styled-components";

import { ReactComponent as SettingsSVG } from "../../../assets/icons/settings-icon.svg";
import { ReactComponent as BookingsSVG } from "../../../assets/icons/bookings-icon.svg";
import { ReactComponent as ReviewsSVG } from "../../../assets/icons/star-regular.svg";
import { ReactComponent as WishListSVG } from "../../../assets/icons/heart.svg";
import { ReactComponent as MessagesSVG } from "../../../assets/icons/chat-bubble.svg";
import { ReactComponent as LogoutSVG } from "../../../assets/icons/logout-icon.svg";
import { ReactComponent as PlusSVG } from "../../../assets/icons/plus.svg";
import { ReactComponent as HomeSVG } from "../../../assets/icons/home.svg";
import { ReactComponent as MapSVG } from "../../../assets/icons/map.svg";
import { ReactComponent as UsersSVG } from "../../../assets/icons/users.svg";
import { ReactComponent as HikerSVG } from "../../../assets/icons/person-hiking-solid.svg";
import colors from "../../../colors";

export const SettingsIcon = styled(SettingsSVG)`
  width: 2rem;
  height: 2rem;

  .path {
    stroke: ${colors.iconsLight};
  }
`;

export const BookingsIcon = styled(BookingsSVG)`
  width: 2rem;
  height: 2rem;
  .path {
    fill: ${colors.iconsLight};
  }
`;

export const ReviewsIcon = styled(ReviewsSVG)`
  width: 2rem;
  height: 2rem;
  .path {
    fill: ${colors.iconsLight};
  }
`;

export const WishListIcon = styled(WishListSVG)`
  width: 2rem;
  height: 2rem;
  .stroke {
    fill: ${colors.iconsLight};
  }
  .fill {
    fill: none;
  }
`;

export const MessagesIcon = styled(MessagesSVG)`
  width: 2rem;
  height: 2rem;

  .path {
    stroke: ${colors.iconsLight};
  }
`;

export const PlusIcon = styled(PlusSVG)`
  width: 2rem;
  height: 2rem;

  .path {
    stroke: ${colors.iconsLight};
  }
`;

export const LogoutIcon = styled(LogoutSVG)`
  width: 2rem;
  height: 2rem;

  .path {
    stroke: ${colors.iconsLight};
  }
`;

export const DashboardIcon = styled(HomeSVG)`
  width: 2rem;
  height: 2rem;

  .path {
    stroke: ${colors.iconsLight};
  }
`;

export const ToursIcon = styled(MapSVG)`
  width: 2rem;
  height: 2rem;

  .path {
    stroke: ${colors.iconsLight};
  }
`;

export const UsersIcon = styled(UsersSVG)`
  width: 2rem;
  height: 2rem;

  .path {
    stroke: ${colors.iconsLight};
  }
`;
export const TourGuidesIcon = styled(HikerSVG)`
  width: 2rem;
  height: 2rem;

  .path {
    fill: none;
    stroke-width: 28;
    stroke: ${colors.iconsLight};
  }
`;

export const SettingsOrangeIcon = styled(SettingsSVG)`
  width: 2.4rem;
  height: 2.4rem;

  .path {
    stroke: ${colors.primary};
  }
`;

export const BookingsOrangeIcon = styled(BookingsSVG)`
  width: 2.4rem;
  height: 2.4rem;
  .path {
    fill: ${colors.primary};
  }
`;

export const ReviewsOrangeIcon = styled(ReviewsSVG)`
  width: 2.4rem;
  height: 2.4rem;
  .path {
    fill: ${colors.primary};
  }
`;

export const LogoutOrangeIcon = styled(LogoutSVG)`
  width: 2.4rem;
  height: 2.4rem;

  .path {
    stroke: ${colors.primary};
  }
`;

export const DashboardOrangeIcon = styled(HomeSVG)`
  width: 2.4rem;
  height: 2.4rem;

  .path {
    stroke: ${colors.primary};
  }
`;

export const ToursOrangeIcon = styled(MapSVG)`
  width: 2.4rem;
  height: 2.4rem;

  .path {
    stroke: ${colors.primary};
  }
`;

export const UsersIconOrange = styled(UsersSVG)`
  width: 2.4rem;
  height: 2.4rem;

  .path {
    stroke: ${colors.primary};
  }
`;
export const TourGuidesIconOrange = styled(HikerSVG)`
  width: 2.4rem;
  height: 2.4rem;

  .path {
    fill: none;
    stroke-width: 28;
    stroke: ${colors.primary};
  }
`;

export const PlusIconOrange = styled(PlusSVG)`
  width: 2.4rem;
  height: 2.4rem;

  .path {
    stroke: ${colors.primary};
  }
`;
