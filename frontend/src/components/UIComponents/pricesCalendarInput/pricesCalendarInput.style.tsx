import styled from "styled-components";
import { ReactComponent as ResetSVG } from "../../../assets/rotate-left.svg";
import { QuickFactName } from "../../tourPageComponents/quickFact/quickFact.style";

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
`;

export const CalendarInputTopBarContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 3.2rem;
  height: 8.1rem;
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
