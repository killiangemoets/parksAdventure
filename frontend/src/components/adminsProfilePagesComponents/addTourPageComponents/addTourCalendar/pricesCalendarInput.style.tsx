import styled from "styled-components";
import { ReactComponent as ResetSVG } from "../../../../assets/rotate-left.svg";
import { QuickFactName } from "../../../tourPageComponents/quickFact/quickFact.style";
import { BaseButton } from "../../../UIComponents/button/button.style";

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
    font-size: 1.4rem;

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

  .fc-h-event .fc-event-title {
    font-size: 1.4rem;
  }

  .fc .fc-col-header-cell-cushion {
    font-size: 1.4rem;
  }

  .fc .fc-col-header-cell-cushion,
  .fc .fc-daygrid-day-number {
    font-size: 1.4rem;
  }

  .fc .fc-daygrid-event-harness {
    min-width: 12rem;
  }

  .fc .fc-daygrid-day-frame {
    overflow-x: scroll;
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
    width: 20rem;
  }

  @media (max-width: 800px) {
    height: auto;
    display: grid;
    grid-template-columns: repeat(4, auto);
    align-items: center;
    justify-content: center;
    row-gap: 2rem;
    column-gap: 3.2rem;

    & ${BaseButton} {
      grid-row: 2/3;
      grid-column: 3/5;
    }
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

  @media (max-width: 800px) {
    grid-row: 2/3;
    grid-column: 1/3;
  }
`;

export const ResetButtonWrapper = styled.div`
  button {
    width: fit-content;
  }

  @media (max-width: 800px) {
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      margin-right: 2rem;
    }
  }
`;

export const ErrorMessage = styled.p`
  max-width: 38rem;
  text-align: center;
  height: 2rem;
  color: #ff0033;
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.4px;
`;
