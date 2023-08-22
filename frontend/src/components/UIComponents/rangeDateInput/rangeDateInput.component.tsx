import type { RangePickerProps } from "antd/es/date-picker";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { RangeDatePickerElement } from "./rangeDateInput.style";
import { ConfigProvider } from "antd";
import { FC } from "react";
import colors from "../../../colors";

dayjs.extend(customParseFormat);

const rangePresets: {
  label: string;
  value: [Dayjs, Dayjs];
}[] = [
  { label: "Today", value: [dayjs(), dayjs()] },
  { label: "Tomorrow", value: [dayjs().add(1, "d"), dayjs().add(1, "d")] },
  { label: "Next Week", value: [dayjs().add(7, "d"), dayjs().add(14, "d")] },
  { label: "Next Month", value: [dayjs().add(30, "d"), dayjs().add(60, "d")] },
];

type RangeDateInputProps = {
  currentValues: [Dayjs, Dayjs] | null;
  handleChange: (values: any) => void;
  adminStyle?: boolean;
  enableAllDates?: boolean;
};

const RangeDateInput: FC<RangeDateInputProps> = ({
  currentValues,
  handleChange,
  adminStyle = false,
  enableAllDates,
}) => {
  const dateInputs = document.querySelectorAll(".ant-picker-input input");

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    if (enableAllDates) return false;
    return current && current <= dayjs().add(-1, "d");
  };

  const onChange = (values: any) => {
    dateInputs.forEach((dateInput) => {
      (dateInput as HTMLElement).blur();
    });
    handleChange(values);
  };

  return (
    <ConfigProvider
      theme={{
        hashed: false,
        components: {
          DatePicker: {
            colorPrimary: colors.primary,
            fontSize: 16,
            colorText: colors.darkGrey,
            colorTextPlaceholder: colors.grey,
            borderRadiusSM: 999,
            colorBgContainerDisabled: "rgba(80, 96, 68, 0.1)",
            colorBgElevated: colors.background,
          },
        },
      }}>
      <RangeDatePickerElement
        presets={rangePresets}
        disabledDate={disabledDate}
        value={currentValues}
        onChange={(values) => {
          onChange(values);
        }}
        format="DD/MM/YYYY"
        className="range-date-picker"
        adminStyle={adminStyle}
      />
    </ConfigProvider>
  );
};

export default RangeDateInput;
