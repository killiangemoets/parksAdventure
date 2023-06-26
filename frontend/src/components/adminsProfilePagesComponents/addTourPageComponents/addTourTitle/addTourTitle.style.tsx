import styled from "styled-components";

export const AddTourTitleContainer = styled.div`
  padding: 6.4rem 6.4rem 3.2rem 6.4rem;
  /* padding: 6.4rem; */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
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
  font-size: 1.6rem;
  font-family: inherit;
  color: inherit;
  border: none;
  background-color: #fdfaf5;
  border-radius: 4px;
  box-shadow: none;
  transition: all 0.3s;
  border: 1px solid #fdfaf5;

  font-weight: 700;
  color: #506044;
  /* background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#738069),
    to(#48563d)
  );
  background-image: linear-gradient(to right, #738069, #48563d); */
  /* -webkit-background-clip: text;  */
  /* color: transparent; */
  font-size: 3.6rem;
  letter-spacing: 2px;
  text-transform: uppercase;

  &::placeholder {
    color: #aaa;
    /* color: #738069; */
    /* color: #627057; */
    font-size: 3.2rem;
    letter-spacing: 1px;
    font-weight: 500;
    text-transform: none;
  }

  &:focus {
    outline: none;
    border: 1px solid #aaa;
  }

  ${({ error }) =>
    error && {
      border: "2px solid #ff0033",
    }}
`;
