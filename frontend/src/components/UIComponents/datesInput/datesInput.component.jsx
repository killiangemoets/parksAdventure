import React from "react";
// import type { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { RangeDatePickerElement, SpaceElement } from "./datesInput.style";
import { ConfigProvider } from "antd";

dayjs.extend(customParseFormat);

// const disabledDate: RangePickerProps["disabledDate"] = (current) => {
const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current <= dayjs().add(-1, "d");
};

// const rangePresets: {
//   label: string,
//   value: [Dayjs, Dayjs],
// }[] = [
const rangePresets = [
  { label: "Today", value: [dayjs(), dayjs()] },
  { label: "Tomorrow", value: [dayjs().add(1, "d"), dayjs().add(1, "d")] },
  { label: "Next Week", value: [dayjs().add(7, "d"), dayjs().add(14, "d")] },
  { label: "Next Month", value: [dayjs().add(30, "d"), dayjs().add(60, "d")] },
];

const DatesInput = () => (
  <ConfigProvider
    theme={{
      components: {
        DatePicker: {
          colorPrimary: "#cc704b",
          fontSize: "1.6rem",
          colorText: "#333",
          colorTextPlaceholder: "#aaa",
          borderRadiusSM: "999px",
          colorBgContainerDisabled: "rgba(80, 96, 68, 0.1)",
          colorBgElevated: "#faf2e5",
        },
      },
    }}
  >
    <RangeDatePickerElement
      presets={rangePresets}
      disabledDate={disabledDate}
    />
  </ConfigProvider>
);

export default DatesInput;
