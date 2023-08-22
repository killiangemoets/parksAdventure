import styled from "styled-components";
import colors from "../../../colors";

export const SwitchInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;

  .ant-switch,
  .ant-switch.ant-switch-checked:hover:not(.ant-switch-disabled) {
    background-color: ${colors.veryLightGrey};

    &:hover {
      background-color: ${colors.lightGrey};
    }
  }

  @media (max-width: 800px) {
    grid-column: 1/4;
  }
`;

type SwitchInputValueProps = {
  selected?: boolean;
};

export const SwitchInputValue = styled.p<SwitchInputValueProps>`
  font-weight: 500;
  font-size: 1.4rem;
  letter-spacing: 0.8px;
  ${({ selected }) => selected && { color: colors.primary }}
`;
