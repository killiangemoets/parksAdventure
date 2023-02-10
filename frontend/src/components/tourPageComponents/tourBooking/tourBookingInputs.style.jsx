import styled from "styled-components";
import { ReactComponent as GroupSVG } from "../../../assets/users-solid.svg";

export const TourBookingInputsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  button {
    height: 5.2rem;
  }
`;

export const GroupIcon = styled(GroupSVG)`
  width: 2rem;
  height: 2rem;
  .path {
    fill: #aaa;
  }
`;
