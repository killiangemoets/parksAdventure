import { FC, ReactNode } from "react";
import {
  QuickFactName,
  QuickFactType,
} from "../../../tourPageComponents/quickFact/quickFact.style";
import type { Dayjs } from "dayjs";
import InfoIcon, {
  INFO_ICON_TYPE_CLASSES,
} from "../../../UIComponents/infoIcon/infoIcon.component";

import { InputNumber, Input, ConfigProvider, TimePicker } from "antd";
import Dropdown, {
  DROPDOWN_TYPE_CLASSES,
} from "../../../UIComponents/dropdown/dropdown.component";
import { BUTTON_TYPE_CLASSES } from "../../../UIComponents/button/button.component";
import {
  QuickFactDescription,
  QuickFactInfo,
  QuickFactInputContainer,
} from "./quickFactInput.style";

export enum QUICK_FACT_INPUT_TYPE {
  number = "number",
  text = "text",
  dropdown = "dropdown",
  time = "time",
}

export type HandleChangeValueType =
  | Info[]
  | Info
  | string
  | number
  | Dayjs
  | null;

export type QuickFactsCommonProps = {
  iconType?: INFO_ICON_TYPE_CLASSES;
  infoName: string;
  infoDescription?: string;
  name: string;
  error?: boolean;
  handleChange: (value: HandleChangeValueType, name: string) => void;
};

export type QuickFactsConditionalProps =
  | {
      type: QUICK_FACT_INPUT_TYPE.text;
      dropdownType?: never;
      placeholder?: string;
      addonAfter?: never;
      min?: never;
      max?: never;
      format?: never;
      minuteStep?: never;
      value: string | undefined;
      dropdownList?: never;
      current?: never;
      options?: never;
      selection?: never;
      allowSelectAll?: never;
      children?: never;
      maxLength?: number;
    }
  | {
      type: QUICK_FACT_INPUT_TYPE.number;
      dropdownType?: never;
      placeholder?: string;
      addonAfter?: string;
      min?: number;
      max?: number;
      format?: never;
      minuteStep?: never;
      value: number | undefined;
      current?: never;
      dropdownList?: never;
      options?: never;
      selection?: never;
      allowSelectAll?: never;
      children?: never;
      maxLength?: never;
    }
  | {
      type: QUICK_FACT_INPUT_TYPE.time;
      dropdownType?: never;
      placeholder?: never;
      addonAfter?: never;
      min?: never;
      max?: never;
      format?: string;
      minuteStep?: number;
      value: Dayjs | null | undefined;
      current?: never;
      dropdownList?: never;
      options?: never;
      selection?: never;
      allowSelectAll?: never;
      children?: never;
      maxLength?: never;
    }
  | {
      type: QUICK_FACT_INPUT_TYPE.dropdown;
      dropdownType?: DROPDOWN_TYPE_CLASSES.input;
      placeholder?: never;
      addonAfter?: never;
      min?: never;
      max?: never;
      format?: never;
      minuteStep?: never;
      value?: never;
      dropdownList: Info[];
      current: Info;
      options?: never;
      selection?: never;
      allowSelectAll?: never;
      children?: ReactNode;
      maxLength?: never;
    }
  | {
      type: QUICK_FACT_INPUT_TYPE.dropdown;
      dropdownType?: DROPDOWN_TYPE_CLASSES.checkBoxes;
      placeholder?: never;
      addonAfter?: never;
      min?: never;
      max?: never;
      format?: never;
      minuteStep?: never;
      value?: never;
      dropdownList?: never;
      current?: never;
      options: Info[];
      selection: Info[];
      allowSelectAll?: boolean;
      children?: ReactNode;
      maxLength?: never;
    };

const QuickFactInput: FC<
  QuickFactsCommonProps & QuickFactsConditionalProps
> = ({
  type,
  iconType,
  infoName,
  infoDescription,
  name,
  error,
  ...otherProps
}) => {
  const {
    placeholder,
    addonAfter,
    min,
    max,
    dropdownList,
    value,
    current,
    handleChange,
    dropdownType = DROPDOWN_TYPE_CLASSES.input,
    options,
    selection,
    allowSelectAll,
    children,
    format = "HH:mm",
    minuteStep = 1,
    maxLength = Infinity,
  } = otherProps;
  const onChange = (value: HandleChangeValueType) => {
    handleChange(value, name);
  };

  const getQuickFactInput = (type: QUICK_FACT_INPUT_TYPE): ReactNode =>
    ({
      [QUICK_FACT_INPUT_TYPE.text]: (
        <Input
          name={name}
          value={value as string}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          placeholder={placeholder}
          maxLength={maxLength}
        />
      ),
      [QUICK_FACT_INPUT_TYPE.number]: (
        <InputNumber
          min={min}
          max={max}
          onChange={onChange}
          addonAfter={addonAfter}
          name={name}
          value={value as number}
          placeholder={placeholder}
        />
      ),
      [QUICK_FACT_INPUT_TYPE.time]: (
        <TimePicker
          minuteStep={minuteStep}
          format={format}
          name={name}
          value={value as Dayjs}
          onChange={(value) => {
            onChange(value);
          }}
        />
      ),
      [QUICK_FACT_INPUT_TYPE.dropdown]:
        dropdownType === DROPDOWN_TYPE_CLASSES.input ? (
          <Dropdown
            dropdownType={dropdownType}
            current={current as Info}
            list={dropdownList ? dropdownList : []}
            handleInput={onChange}
            buttonType={BUTTON_TYPE_CLASSES.rectangular}
          >
            {children}
          </Dropdown>
        ) : dropdownType === DROPDOWN_TYPE_CLASSES.checkBoxes ? (
          <Dropdown
            dropdownType={dropdownType}
            buttonType={BUTTON_TYPE_CLASSES.rectangular}
            options={options || []}
            selection={selection || []}
            handleCheckBoxes={onChange}
            allowSelectAll={allowSelectAll}
          >
            {children}
          </Dropdown>
        ) : (
          <></>
        ),
    }[type]);

  const QuickFactInputElement = getQuickFactInput(type);

  return (
    <QuickFactInputContainer error={error}>
      <QuickFactInfo>
        <QuickFactType>
          {iconType && <InfoIcon iconType={iconType} />}
          <QuickFactName>{infoName}</QuickFactName>
        </QuickFactType>
        {infoDescription && (
          <QuickFactDescription>{infoDescription}</QuickFactDescription>
        )}
      </QuickFactInfo>
      <ConfigProvider
        theme={{
          hashed: false,
          components: {
            InputNumber: {
              colorPrimary: "#cc704b",
              colorLink: "#cc704b",
              fontSize: 16,
              colorText: "#333",
              colorTextPlaceholder: "#aaa",
              borderRadiusSM: 999,
              colorBgContainerDisabled: "rgba(80, 96, 68, 0.1)",
              colorBgElevated: "#fdfaf5",
            },
            DatePicker: {},
          },
        }}
      >
        {QuickFactInputElement}
      </ConfigProvider>
    </QuickFactInputContainer>
  );
};

export default QuickFactInput;
