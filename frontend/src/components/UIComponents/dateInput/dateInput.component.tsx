import React from "react";
import dayjs, { type Dayjs } from "dayjs";
import type { DatePickerProps } from "antd";
import { ConfigProvider } from "antd";
import { DatePickerElement } from "./dateInput.style";

const DateInput = () => {
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const disabledDate = (current: Dayjs) => {
    return current && current <= dayjs().add(-1, "d");
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
        onChange={onChange}
        disabledDate={disabledDate}
        format="DD/MM/YYYY"
      />
    </ConfigProvider>
  );
};

export default DateInput;
