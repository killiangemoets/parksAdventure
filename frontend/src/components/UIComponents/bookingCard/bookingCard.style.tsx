import styled from "styled-components";
import { ReactComponent as CheckSVG } from "../../../assets/icons/check-circle.svg";
import colors from "../../../colors";

export const BookingCardContainer = styled.div`
  padding: 2rem;
  border: 3px solid ${colors.primary};
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 600px) {
    gap: 2.4rem;
    display: grid;
    grid-template-columns: 1fr;
  }
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
    stroke: ${colors.secondary};
    stroke: ${colors.secondaryMediumLight};
  }
`;

export const ConfirmationText = styled.p`
  font-size: 1.4rem;
  line-height: 1.4rem;
  color: ${colors.secondary};
  color: ${colors.secondaryMediumLight};
  font-weight: 500;
  text-transform: capitalize;
  letter-spacing: 1px;
`;

export const BookingText = styled.p`
  text-transform: capitalize;
  font-size: 1.2rem;
  font-weight: 400;
  letter-spacing: 0.4px;
  color: ${colors.medium2Grey};
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

export const BookingReviewUserInfo = styled.div`
  @media (max-width: 600px) {
    grid-row: 1/2;
    margin-bottom: 1rem;
    margin-left: 0.4rem;
  }
`;
