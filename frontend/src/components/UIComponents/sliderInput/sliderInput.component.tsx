import { InputNumbers, SliderInputContainer } from "./sliderInput.style";
import { ConfigProvider, InputNumber, Slider } from "antd";
import { FC } from "react";

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
    console.log("onChange: ", values);
    if (values[1] < values[0]) return;
    handler(values);
  };

  return (
    <SliderInputContainer>
      <ConfigProvider
        theme={{
          components: {
            Slider: {
              colorPrimary: "#506044",
              colorPrimaryBorder: "#96a08f",
              colorPrimaryBorderHover: "#96a08f",
              colorFillSecondary: "#ccc",
              colorFillTertiary: "#ddd",
            },
            InputNumber: {
              colorText: "#333",
              colorBorder: "#ddd",
              colorPrimaryHover: "#506044 ",
            },
          },
        }}
      >
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
