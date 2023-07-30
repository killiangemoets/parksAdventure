import styled, { css } from "styled-components";

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
  color: #333;
  min-width: 12rem;
`;
