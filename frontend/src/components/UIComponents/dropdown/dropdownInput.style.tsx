import styled from "styled-components";
import colors from "../../../colors";

export const DropdownContainer = styled.div`
  position: absolute;
  top: 112%;
  min-width: 100%;
  background-color: ${colors.background};
  border-radius: 8px;
  box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.1);
  z-index: 3;
  padding: 0.6rem 0;
  max-height: 40rem;
  overflow: auto;
`;

type OptionProps = {
  current: boolean;
};

export const Option = styled.li<OptionProps>`
  list-style-type: none;
  display: flex;
  align-items: center;
  gap: 1rem;
  border: none;
  text-decoration: none;
  cursor: pointer;

  padding: 0 1.6rem;
  min-height: 4.4rem;
  font-size: 1.6rem;
  font-weight: 600;

  transition: all 0.3s;

  background-color: ${({ current }) =>
    current ? colors.primaryMediumLight : "none"};

  color: ${({ current }) => (current ? colors.white : colors.darkGrey)};

  &:hover,
  &:visited {
    background-color: ${colors.primaryMediumLight};
    color: ${colors.white};
  }
`;
