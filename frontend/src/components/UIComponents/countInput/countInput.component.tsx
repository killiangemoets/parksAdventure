import { FC } from "react";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
  CountInputContainer,
  CountValue,
  Minus,
  Plus,
} from "./countInput.style";

export type CountInputProps = {
  value: number;
  name: string;
  updateValue: (value: number, name: string) => void;
};

const CountInput: FC<CountInputProps> = ({ updateValue, value, name }) => {
  const handleClick = (type: string) => {
    if (type === "plus") return updateValue(value + 1, name);
    if (type === "minus" && value > 0) return updateValue(value - 1, name);
  };
  const handleWrite = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue: number = +event.target.value;
    if (newValue < 0 || !newValue) newValue = 0;
    updateValue(newValue, name);
  };

  return (
    <CountInputContainer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.empty}
        onClick={() => {
          handleClick("minus");
        }}>
        <Minus />
      </Button>
      <CountValue
        name={name}
        type={"number"}
        min={0}
        value={value}
        onChange={handleWrite}
      />
      <Button
        buttonType={BUTTON_TYPE_CLASSES.empty}
        onClick={() => {
          handleClick("plus");
        }}>
        <Plus />
      </Button>
    </CountInputContainer>
  );
};

export default CountInput;
