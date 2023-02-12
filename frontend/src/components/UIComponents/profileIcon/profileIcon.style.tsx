import styled from "styled-components";

import { ReactComponent as SettingsSVG } from "../../../assets/settings-icon.svg";
import { ReactComponent as BookingsSVG } from "../../../assets/bookings-icon.svg";
import { ReactComponent as ReviewsSVG } from "../../../assets/star-regular.svg";
import { ReactComponent as WishListSVG } from "../../../assets/heart.svg";
import { ReactComponent as MessagesSVG } from "../../../assets/chat-bubble.svg";
import { ReactComponent as LogoutSVG } from "../../../assets/logout-icon.svg";

export const SettingsIcon = styled(SettingsSVG)`
  width: 2rem;
  height: 2rem;

  .path {
    stroke: #fbf3e5;
  }
`;

export const BookingsIcon = styled(BookingsSVG)`
  width: 2rem;
  height: 2rem;
  .path {
    fill: #fbf3e5;
  }
`;

export const ReviewsIcon = styled(ReviewsSVG)`
  width: 2rem;
  height: 2rem;
  .path {
    fill: #fbf3e5;
  }
`;

export const WishListIcon = styled(WishListSVG)`
  width: 2rem;
  height: 2rem;
  .stroke {
    fill: #fbf3e5;
  }
  .fill {
    fill: none;
  }
`;

export const MessagesIcon = styled(MessagesSVG)`
  width: 2rem;
  height: 2rem;

  .path {
    stroke: #fbf3e5;
  }
`;

export const LogoutIcon = styled(LogoutSVG)`
  width: 2rem;
  height: 2rem;

  .path {
    stroke: #fbf3e5;
  }
`;
