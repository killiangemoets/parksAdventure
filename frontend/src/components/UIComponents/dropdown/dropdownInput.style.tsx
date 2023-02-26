import styled from "styled-components";

export const DropdownContainer = styled.div`
  position: absolute;
  top: 112%;
  width: 100%;
  background-color: #fdfaf5;
  border-radius: 8px;
  box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.1);
  z-index: 999;
  padding: 0.6rem 0;
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
  height: 4.4rem;
  font-size: 1.6rem;
  font-weight: 600;

  transition: all 0.3s;

  background-color: ${({ current }) => (current ? "#d68d6f" : "none")};

  color: ${({ current }) => (current ? "#fff" : "#333")};

  &:hover,
  &:visited {
    background-color: #d68d6f;
    color: #fff;
  }
`;
