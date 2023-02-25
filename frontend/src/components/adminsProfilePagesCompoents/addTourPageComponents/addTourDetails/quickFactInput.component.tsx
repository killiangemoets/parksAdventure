import { FC, InputHTMLAttributes } from "react";
import {
  QuickFactName,
  QuickFactType,
} from "../../../tourPageComponents/quickFact/quickFact.style";
import InfoIcon, {
  INFO_ICON_TYPE_CLASSES,
} from "../../../UIComponents/infoIcon/infoIcon.component";
import { QuickFactInputContainer } from "./quickFactInput.style";
import { InputNumber, Input, ConfigProvider } from "antd";

export enum QUICK_FACT_INPUT_TYPE {
  number = "number",
  text = "text",
}

export type QuickFactProps = {
  iconType: INFO_ICON_TYPE_CLASSES;
  handleChange: (value: string | number | null, name: string) => void;
  infoName: string;
  type: QUICK_FACT_INPUT_TYPE;
  name: string;
  value: string | number | undefined;
  placeholder?: string;
  addonAfter?: string;
};

const QuickFactInput: FC<QuickFactProps> = ({
  iconType,
  infoName,
  name,
  type = "text",
  handleChange,
  addonAfter = "",
  value,
  placeholder = "",
}) => {
  const onChange = (value: number | string | null) => {
    handleChange(value, name);
  };

  return (
    <QuickFactInputContainer>
      <QuickFactType>
        <InfoIcon iconType={iconType} />
        <QuickFactName>{infoName}</QuickFactName>
      </QuickFactType>
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
          },
        }}
      >
        {type === "number" ? (
          <InputNumber
            min={0}
            onChange={onChange}
            addonAfter={addonAfter}
            name={name}
            value={value}
            placeholder={placeholder}
          />
        ) : (
          <Input
            name={name}
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            placeholder={placeholder}
          />
        )}
      </ConfigProvider>
    </QuickFactInputContainer>
  );
};

export default QuickFactInput;
