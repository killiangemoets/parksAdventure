import { InputNumbers, SliderInputContainer } from "./sliderInput.style";
import { ConfigProvider, InputNumber, Slider } from "antd";
import { FC } from "react";
import colors from "../../../colors";

export type SliderInputProps = {
  min: number;
  max: number;
  currentValues: [number, number];
  handler: (values: [number, number]) => void;
};

const SliderInput: FC<SliderInputProps> = ({
  min,
  max,
  currentValues,
  handler,
}) => {
  const onChange = (values: [number, number]) => {
    if (values[1] < values[0]) return;
    handler(values);
  };

  return (
    <SliderInputContainer>
      <ConfigProvider
        theme={{
          components: {
            Slider: {
              colorPrimary: colors.secondary,
              colorPrimaryBorder: colors.secondaryVeryLight,
              colorPrimaryBorderHover: colors.secondaryVeryLight,
              colorFillSecondary: colors.lightGrey,
              colorFillTertiary: colors.veryLightGrey,
            },
            InputNumber: {
              colorText: colors.darkGrey,
              colorBorder: colors.veryLightGrey,
              colorPrimaryHover: colors.secondary,
            },
          },
        }}>
        <Slider
          range
          step={1}
          min={min}
          max={max}
          onChange={onChange}
          value={currentValues}
        />
        <InputNumbers>
          <InputNumber
            min={min}
            max={max}
            style={{ margin: "0 16px" }}
            value={currentValues[0]}
            onChange={(newValue) => {
              if (!newValue) return;
              onChange([newValue, currentValues[1]]);
            }}
          />
          <InputNumber
            min={min}
            max={max}
            style={{ margin: "0 16px" }}
            value={currentValues[1]}
            onChange={(newValue) => {
              if (!newValue) return;
              onChange([currentValues[0], newValue]);
            }}
          />
        </InputNumbers>
      </ConfigProvider>
    </SliderInputContainer>
  );
};
export default SliderInput;
