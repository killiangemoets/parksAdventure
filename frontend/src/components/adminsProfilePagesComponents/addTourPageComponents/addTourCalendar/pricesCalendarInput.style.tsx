import styled from "styled-components";
import { ReactComponent as ResetSVG } from "../../../../assets/icons/rotate-left.svg";
import { QuickFactName } from "../../../tourPageComponents/quickFact/quickFact.style";
import { BaseButton } from "../../../UIComponents/button/button.style";
import colors from "../../../../colors";

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
    background-color: ${colors.white} !important;
  }

  .fc .fc-button-primary:disabled {
    background-color: ${colors.primary};
    border-color: ${colors.primary};
    background-color: ${colors.secondaryVariant};
    border-color: ${colors.secondaryVariant};

    &:hover {
      background-color: ${colors.primaryDark};

      background-color: ${colors.secondary};
      border-color: ${colors.secondary};
    }
  }

  .fc .fc-button-primary {
    background-color: ${colors.primary};
    border-color: ${colors.primary};
    transition: all 0.3s;
    background-color: ${colors.secondaryVariant};
    border-color: ${colors.secondaryVariant};
    font-size: 1.4rem;

    &:hover {
      background-color: ${colors.primaryDark};

      background-color: ${colors.secondary};
      border-color: ${colors.secondary};
    }
  }

  .fc .fc-toolbar-title {
    color: ${colors.primary} !important;
  }

  .fc .fc-col-header-cell-cushion,
  .fc .fc-daygrid-day-number {
    color: ${colors.secondary};
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
    column-gap: 2rem;

    & ${BaseButton} {
      grid-row: 2/3;
      grid-column: 2/4;
      width: fit-content;
    }
  }
`;

export const SelectedDate = styled.div``;

export const ResetIcon = styled(ResetSVG)`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  .path {
    fill: ${colors.grey};
    transition: all 0.3s;
  }

  &:hover {
    .path {
      fill: ${colors.primary};
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
  color: ${colors.darkGrey};
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
  color: ${colors.error};
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.4px;
`;
