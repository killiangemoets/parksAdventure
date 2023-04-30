import styled from "styled-components";
import { ReactComponent as CheckSVG } from "../../../assets/check-circle.svg";

export const BookingCardContainer = styled.div`
  padding: 2rem;
  border: 3px solid #cc704b;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const BookingPictureAndInfos = styled.div`
  display: flex;
  gap: 2rem;
`;

export const BookingPicture = styled.div`
  img {
    width: 10rem;
    border-radius: 2px;
  }
`;

export const BookingInfos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;

  button {
    padding-top: 0.4rem;
    font-size: 1.4rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const BookingTitle = styled.h4`
  font-weight: 700;
  text-transform: uppercase;
  font-size: 1.6rem;
  letter-spacing: 1px;
`;

export const BookingConfirmation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.4rem 0;
`;

export const ConfirmationIcon = styled(CheckSVG)`
  height: 1.6rem;
  width: 1.6rem;
  .path {
    stroke: #506044;
    stroke: #738069;
  }
`;

export const ConfirmationText = styled.p`
  font-size: 1.4rem;
  line-height: 1.4rem;
  color: #506044;
  color: #738069;
  font-weight: 500;
  text-transform: capitalize;
  letter-spacing: 1px;
`;

export const BookingText = styled.p`
  text-transform: capitalize;
  font-size: 1.2rem;
  font-weight: 400;
  letter-spacing: 0.4px;
  color: #888;
  span {
    font-weight: 700;
  }
`;

export const BookingReviewButton = styled.div`
  align-self: flex-end;

  button {
    min-width: 10rem;
    font-size: 1.4rem;
    padding: 1rem 2rem;
  }
`;
