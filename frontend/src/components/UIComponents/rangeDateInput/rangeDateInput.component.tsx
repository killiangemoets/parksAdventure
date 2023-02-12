import React from "react";
import type { RangePickerProps } from "antd/es/date-picker";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { RangeDatePickerElement } from "./rangeDateInput.style";
import { ConfigProvider } from "antd";

dayjs.extend(customParseFormat);

const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  return current && current <= dayjs().add(-1, "d");
};

const rangePresets: {
  label: string;
  value: [Dayjs, Dayjs];
}[] = [
  { label: "Today", value: [dayjs(), dayjs()] },
  { label: "Tomorrow", value: [dayjs().add(1, "d"), dayjs().add(1, "d")] },
  { label: "Next Week", value: [dayjs().add(7, "d"), dayjs().add(14, "d")] },
  { label: "Next Month", value: [dayjs().add(30, "d"), dayjs().add(60, "d")] },
];

const RangeDateInput = () => (
  <ConfigProvider
    theme={{
      components: {
        DatePicker: {
          colorPrimary: "#cc704b",
          // fontSize: "1.6rem",
          fontSize: 16,
          colorText: "#333",
          colorTextPlaceholder: "#aaa",
          // borderRadiusSM: "999px",
          borderRadiusSM: 999,
          colorBgContainerDisabled: "rgba(80, 96, 68, 0.1)",
          // colorBgElevated: "#faf2e5",
          colorBgElevated: "#fdfaf5",
        },
      },
    }}
  >
    <RangeDatePickerElement
      presets={rangePresets}
      disabledDate={disabledDate}
      format="DD/MM/YYYY"
    />
  </ConfigProvider>
);

export default RangeDateInput;
