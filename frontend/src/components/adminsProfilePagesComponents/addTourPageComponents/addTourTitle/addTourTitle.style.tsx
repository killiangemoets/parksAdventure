import styled from "styled-components";
import colors from "../../../../colors";

export const AddTourTitleContainer = styled.div`
  padding: 6.4rem 6.4rem 3.2rem 6.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media (max-width: 450px) {
    padding: 6.4rem 3.2rem 3.2rem 3.2rem;
  }
`;

export const AddTourTitleWrapper = styled.div`
  width: 100%;
  max-width: 125rem;
`;

type TitleInputProps = {
  error?: boolean;
};

export const TitleInput = styled.input<TitleInputProps>`
  width: 100%;
  min-width: 52rem;
  padding: 1.25rem 1.75rem;
  height: 5.2rem;
  font-family: inherit;
  color: inherit;
  border: none;
  background-color: ${colors.background};
  border-radius: 4px;
  box-shadow: none;
  transition: all 0.3s;
  border: 1px solid ${colors.background};

  font-weight: 700;
  color: ${colors.secondary};
  font-size: 3.6rem;
  letter-spacing: 2px;
  text-transform: uppercase;

  &::placeholder {
    color: ${colors.grey};
    font-size: 3.2rem;
    letter-spacing: 1px;
    font-weight: 500;
    text-transform: none;
  }

  &:focus {
    outline: none;
    border: 1px solid ${colors.grey};
  }

  ${({ error }) =>
    error && {
      border: "2px solid",
      borderColor: colors.error,
    }}

  @media (max-width: 550px) {
    width: 100%;
    min-width: 0;
    padding: 1.25rem 1.75rem;
    height: 5.2rem;
    font-size: 3.2rem;
    letter-spacing: 1px;

    &::placeholder {
      font-size: 2.8rem;
      letter-spacing: 0.6px;
    }
  }
`;
