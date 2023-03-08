import styled from "styled-components";
import { ReactComponent as ResetSVG } from "../../../../assets/rotate-left.svg";
import { QuickFactName } from "../../../tourPageComponents/quickFact/quickFact.style";
import {
  BaseButton,
  InvertedButton,
} from "../../../UIComponents/button/button.style";

export const CalendarInputContainer = styled.div`
  .ant-picker-calendar.ant-picker-calendar-full
    .ant-picker-cell-in-view.ant-picker-cell-selected
    .ant-picker-calendar-date {
    background: none !important;
  }

  .fc .fc-daygrid-day.fc-day-today,
  .fc-daygrid-day-bg {
    background: none !important;
  }

  .fc .fc-highlight {
    background-color: #ecf2e7;
  }

  & ${QuickFactName} {
    width: 12rem;
  }

  .ant-input-number-group-addon,
  .ant-input-number,
  .ant-picker {
    background-color: #fff !important;
  }

  .fc .fc-button-primary:disabled {
    background-color: #cc704b;
    border-color: #cc704b;
    background-color: #627057;
    border-color: #627057;

    &:hover {
      background-color: #b86544;

      background-color: #506044;
      border-color: #506044;
    }
  }

  .fc .fc-button-primary {
    background-color: #cc704b;
    border-color: #cc704b;
    transition: all 0.3s;
    background-color: #627057;
    border-color: #627057;

    &:hover {
      background-color: #b86544;

      background-color: #506044;
      border-color: #506044;
    }
  }

  .fc .fc-toolbar-title {
    color: #cc704b !important;
  }

  .fc .fc-col-header-cell-cushion,
  .fc .fc-daygrid-day-number {
    color: #506044;
  }
`;

export const CalendarInputTopBarContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 3.2rem;
  height: 8.1rem;

  & ${BaseButton} {
    padding: 1rem 2rem;
    font-size: 1.4rem;
    width: 18.8rem;
  }

  & ${InvertedButton} {
  }
`;

export const SelectedDate = styled.div``;

export const ResetIcon = styled(ResetSVG)`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  .path {
    fill: #aaa;
    transition: all 0.3s;
  }

  &:hover {
    .path {
      fill: #cc704b;
    }
  }
`;

export const PriceModalButtons = styled.div`
  margin-top: 2rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const DeleteMessage = styled.p`
  font-size: 1.8rem;
  line-height: 2.8rem;
  font-weight: 400;
  letter-spacing: 1px;
  color: #333;
  text-align: center;
`;

export const DeleteButtonWrapper = styled.div`
  width: 18.8rem;
`;
