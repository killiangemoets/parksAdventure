import { FC, useEffect, useRef, useState } from "react";
import { ConfigProvider, Slider } from "antd";
import { SliderStepsContainer } from "./sliderSteps.style";

export type SliderStepsProps = {
  steps: TInfo<string>[];
  currentValues: TInfo<string>[];
  handler: (values: TInfo<string>[]) => void;
};

const SliderSteps: FC<SliderStepsProps> = ({
  steps,
  handler,
  currentValues,
}) => {
  const [inputValues, setInputValues] = useState<[number, number]>([0, 100]);
  const [marks, setMarks] = useState({});
  const marksRef = useRef<(HTMLSpanElement | null)[]>([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    let createMarks: {
      [key: number]: {};
    } = {};
    steps.forEach((step, i) => {
      const stepValue = (100 / (steps.length - 1)) * i;

      createMarks[stepValue] = {
        style: {
          color: "#506044",
          fontSize: "1.6rem",
          marginTop: "0.4rem",
          fontWeight: 500,
          letterSpacing: isSmallScreen ? "0.2px" : "1px",
        },
        label: (
          <span
            ref={(el) => (marksRef.current[i] = el)}
            data-step-value={stepValue}>
            {step.value}
          </span>
        ),
      };
    });

    setMarks({ ...createMarks });
  }, [isSmallScreen, steps]);

  useEffect(() => {
    marksRef.current.forEach((markEl) => {
      if (!markEl || !markEl.dataset.stepValue) return;
      if (
        +markEl.dataset.stepValue >= inputValues[0] &&
        +markEl.dataset.stepValue <= inputValues[1]
      ) {
        markEl.style.color = "#506044";
        markEl.style.fontSize = isSmallScreen ? "1.4rem" : "1.6rem";
      } else {
        markEl.style.color = "#333";
        markEl.style.fontSize = isSmallScreen ? "1rem" : "1.2rem";
      }
    });
  }, [inputValues, isSmallScreen]);

  useEffect(() => {
    const min = steps.findIndex((step) => step.id === currentValues[0].id);
    const max = steps.findIndex(
      (step) => step.id === currentValues[currentValues.length - 1].id
    );

    const stepMin = (100 / (steps.length - 1)) * min;
    const stepMax = (100 / (steps.length - 1)) * max;

    setInputValues([stepMin, stepMax]);
  }, [currentValues, steps]);

  const onChange = (values: [number, number]) => {
    setInputValues(values);
    let newValues = [];
    for (
      let i = Math.trunc(values[0] / (100 / (steps.length - 1)));
      i <= Math.trunc(values[1] / (100 / (steps.length - 1)));
      i++
    ) {
      newValues.push(steps[i]);
    }
    handler(newValues);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480 && !isSmallScreen) {
        setIsSmallScreen(true);
      } else if (window.innerWidth > 480 && isSmallScreen) {
        setIsSmallScreen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
  }, [isSmallScreen]);

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
        }}>
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
