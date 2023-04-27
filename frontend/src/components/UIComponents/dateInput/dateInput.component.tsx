import React, { FC, ReactNode } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DatePickerProps } from "antd";
import { ConfigProvider } from "antd";
import { DateInputValue, DatePickerElement } from "./dateInput.style";

type DateInputProps = {
  currentValue: Date | null;
  handleChange: (value: Date | null) => void;
  enabledDates?: Date[];
  highlightDates?: Date[];
  highlightDates2?: Date[];
  footer?: string | ReactNode;
  error?: boolean;
};

const DateInput: FC<DateInputProps> = ({
  currentValue,
  handleChange,
  enabledDates,
  highlightDates,
  highlightDates2,
  footer,
  error,
}) => {
  const dateInput = document.querySelector(".ant-picker-input input");

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    handleChange(date && date?.toDate());
    dateInput && (dateInput as HTMLElement).blur();
  };

  const disabledDate = (current: Dayjs) => {
    return (
      !Boolean(
        enabledDates?.find(
          (enableDate) =>
            current.isSame(dayjs(enableDate), "day") &&
            new Date(enableDate) > new Date(Date.now())
        )
      ) || current <= dayjs().add(-1, "d")
    );
  };

  return (
    <ConfigProvider
      theme={{
        hashed: false,
        components: {
          DatePicker: {
            colorPrimary: "#cc704b",
            colorLink: "#cc704b",
            colorLinkHover: "#b86544",
            fontSize: 16,
            colorText: "#333",
            colorTextPlaceholder: "#aaa",
            borderRadiusSM: 999,
            colorBgContainerDisabled: "rgba(80, 96, 68, 0.1)",
            colorBgElevated: "#fdfaf5",
          },
        },
      }}
    >
      <DatePickerElement
        style={{ border: error ? "2px solid #ff0033" : "" }}
        onChange={onChange}
        disabledDate={disabledDate}
        value={currentValue && dayjs(currentValue)}
        format="DD/MM/YYYY"
        dateRender={(current) => {
          let highlight = false;
          let highlight2 = false;
          if (
            highlightDates?.find(
              (highlightDate) =>
                current.isSame(dayjs(highlightDate), "day") &&
                new Date(highlightDate) > new Date(Date.now())
            )
          )
            highlight = true;
          if (
            highlightDates2?.find(
              (highlightDate2) =>
                current.isSame(dayjs(highlightDate2), "day") &&
                new Date(highlightDate2) > new Date(Date.now())
            )
          )
            highlight2 = true;
          return (
            <DateInputValue
              className="ant-picker-cell-inner"
              highlight={highlight}
              highlight2={highlight2}
            >
              {current.date()}
            </DateInputValue>
          );
        }}
        renderExtraFooter={() => footer}
      />
    </ConfigProvider>
  );
};

export default DateInput;
