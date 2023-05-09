import styled, { css } from "styled-components";
import { BaseButton } from "../../../components/UIComponents/button/button.style";
import { CheckBoxesContainer } from "../../../components/UIComponents/checkBoxes/checkBoxes.style";

type AddTourContainerProps = {
  paddingTop?: boolean;
};

export const AddTourContainer = styled.div<AddTourContainerProps>`
  display: flex;
  flex-direction: column;
  /* gap: 6.4rem; */
  width: 100%;

  ${({ paddingTop }) =>
    paddingTop &&
    css`
      padding-top: 18rem;
    `}
`;

export const AddTourButtons = styled.div`
  padding: 6.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const AddTourButtonsWrapper = styled.div`
  width: 100%;
  max-width: 100rem;
  display: flex;
  justify-content: space-around;
  align-items: center;

  & ${BaseButton} {
    height: 5.2rem;
    font-size: 2rem;
    font-weight: 500;
  }
`;

export const CancelButton = styled.div`
  height: 16rem;
  display: flex;
  align-items: center;
`;

export const MainButton = styled.div`
  height: 16rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  & ${CheckBoxesContainer} {
    label span {
      font-size: 1.6rem;
      /* line-height: 1.8rem; */
      padding-right: 0;
      margin: 0 !important;
      font-weight: 500;
      color: #333;
      letter-spacing: 0.6px;
    }

    .ant-checkbox-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ant-checkbox .ant-checkbox-inner {
      width: 2.4rem;
      height: 2.4rem;
      margin-bottom: 2rem;
    }

    .ant-checkbox .ant-checkbox-inner:after {
      width: 0.8rem;
      height: 1.4rem;
    }

    .ant-checkbox-group {
      height: 2.6rem;
    }
  }

  & ${BaseButton} {
    width: 40rem;
  }
`;

export const ErrorMessage = styled.p`
  height: 2.6rem;
  padding-left: 0.8rem;
  color: #ff0033;
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 1px;
`;
