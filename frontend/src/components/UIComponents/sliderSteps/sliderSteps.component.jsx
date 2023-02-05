import React, { useEffect, useRef, useState } from "react";
import { ConfigProvider, Slider } from "antd";
import { SliderStepsContainer } from "./sliderSteps.style";
// import type { SliderMarks } from "antd/es/slider";

// const marks: SliderMarks = {

const SliderSteps = ({ steps }) => {
  const [inputValues, setInputValues] = useState([0, 100]);

  const [marks, setMarks] = useState({});

  const marksRef = useRef([]);

  useEffect(() => {
    let createMarks = {};
    steps.forEach((step, i) => {
      const stepValue = (100 / (steps.length - 1)) * i;
      createMarks[stepValue] = {
        style: {
          color: "#506044",
          fontSize: "1.6rem",
          marginTop: "0.4rem",
          fontWeight: 500,
          letterSpacing: "1px",
        },
        label: (
          <span
            ref={(el) => (marksRef.current[i] = el)}
            data-step-value={stepValue}
          >
            {step}
          </span>
        ),
      };
    });
    setMarks({ ...createMarks });
  }, []);

  useEffect(() => {
    marksRef.current.forEach((markEl) => {
      if (
        markEl.dataset.stepValue >= inputValues[0] &&
        markEl.dataset.stepValue <= inputValues[1]
      ) {
        markEl.style.color = "#506044";
        markEl.style.fontSize = "1.6rem";
      } else {
        markEl.style.color = "#333";
        markEl.style.fontSize = "1.2rem";
      }
    });
  }, [inputValues]);

  // const onChange = (value: number | [number, number]) => {
  const onChange = (values) => {
    setInputValues(values);
  };

  return (
    <SliderStepsContainer>
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
          marks={marks}
          step={null}
          //   defaultValue={[0, 100]}
          tooltip={{ open: false }}
          onChange={onChange}
          value={inputValues}
        />
      </ConfigProvider>
    </SliderStepsContainer>
  );
};

export default SliderSteps;
