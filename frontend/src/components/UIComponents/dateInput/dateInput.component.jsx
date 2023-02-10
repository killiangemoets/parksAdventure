import React from "react";
import dayjs from "dayjs";
// import type { DatePickerProps } from "antd";
import { ConfigProvider } from "antd";
import { DatePickerElement } from "./dateInput.style";

// const onChange: DatePickerProps["onChange"] = (date, dateString) => {

const DateInput = () => {
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current <= dayjs().add(-1, "d");
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          DatePicker: {
            colorPrimary: "#cc704b",
            colorLink: "#cc704b",
            colorLinkHover: "#b86544",
            fontSize: "1.6rem",
            colorText: "#333",
            colorTextPlaceholder: "#aaa",
            borderRadiusSM: "999px",
            colorBgContainerDisabled: "rgba(80, 96, 68, 0.1)",
            // colorBgElevated: "#faf2e5",
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
