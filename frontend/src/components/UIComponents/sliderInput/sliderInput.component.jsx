import {
  InputNumbers,
  SliderElement,
  SliderInputContainer,
} from "./sliderInput.style";
import { ConfigProvider, InputNumber, Slider } from "antd";
import { useState } from "react";

const SliderInput = ({ min, max }) => {
  const [inputValues, setInputValues] = useState([min, max]);

  // const onChange = (value: number | [number, number]) => {
  const onChange = (values) => {
    console.log("onChange: ", values);
    if (values[1] < values[0]) return;
    setInputValues(values);
  };

  // const onAfterChange = (value: number | [number, number]) => {
  const onAfterChange = (values) => {
    console.log("onAfterChange: ", values);
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
          // defaultValue={[min, max]}
          // tooltip={{ open: true }}
          onChange={onChange}
          // onAfterChange={onAfterChange}
          value={inputValues}
        />
        <InputNumbers>
          <InputNumber
            min={min}
            max={max}
            style={{ margin: "0 16px" }}
            value={inputValues[0]}
            onChange={(newValue) => {
              onChange([newValue, inputValues[1]]);
            }}
          />
          <InputNumber
            min={min}
            max={max}
            style={{ margin: "0 16px" }}
            value={inputValues[1]}
            onChange={(newValue) => {
              onChange([inputValues[0], newValue]);
            }}
          />
        </InputNumbers>
      </ConfigProvider>
    </SliderInputContainer>
  );
};
export default SliderInput;
