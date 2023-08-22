import styled, { css } from "styled-components";
import colors from "../../../colors";

type RevieweProfileContainerProps = {
  link: boolean;
};
export const ReviewProfileContainer = styled.div<RevieweProfileContainerProps>`
  display: flex;
  align-items: center;
  gap: 1.8rem;
  cursor: auto;

  ${({ link }) =>
    link &&
    css`
      cursor: pointer;
    `}
`;

export const ReviewProfileName = styled.p`
  font-weight: 600;
  margin-right: 2.25rem;
  text-transform: uppercase;
  font-size: 1.6rem;
  letter-spacing: 1px;
  color: ${colors.darkGrey};
  min-width: 12rem;
`;
