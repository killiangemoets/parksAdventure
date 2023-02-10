// import { FC } from "react";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
  CountInput,
  CountInputElement,
  CountInputInfos,
  CountInputSubTitle,
  CountInputTitle,
  CountValue,
  DropdownCountsContainer,
  Minus,
  Plus,
} from "./dropdownCounts.style";

// type DropdownCountsProps = {
//   current: Info | null,
//   list: Info[],
//   handler: (value: string) => void,
//   closeDropdown: () => void,
// };

// const DropdownCounts: FC<DropdownCountsProps> = ({
const DropdownCounts = ({ countInputsState, handler }) => {
  const handleClick = (id, type) => {
    const newCountInputsState = countInputsState.map((countInput) => {
      return {
        ...countInput,
        value:
          countInput.id === id
            ? type === "minus"
              ? countInput.value - 1 < 0
                ? 0
                : countInput.value - 1
              : countInput.value + 1
            : countInput.value,
      };
    });
    handler(newCountInputsState);
  };

  const handleWrite = (event) => {
    let { name: id, value } = event.target;
    if (value < 0 || !value) value = 0;
    const newCountInputsState = countInputsState.map((countInput) => {
      return {
        ...countInput,
        value: countInput.id === id ? +value : countInput.value,
      };
    });
    handler(newCountInputsState);
  };

  return (
    <DropdownCountsContainer>
      {countInputsState.map((countInput) => {
        return (
          <CountInputElement key={countInput.id}>
            <CountInputInfos>
              <CountInputTitle>{countInput.title}</CountInputTitle>
              <CountInputSubTitle>{countInput.subtitle}</CountInputSubTitle>
            </CountInputInfos>
            <CountInput>
              <Button
                buttonType={BUTTON_TYPE_CLASSES.empty}
                onClick={() => {
                  handleClick(countInput.id, "minus");
                }}
              >
                <Minus />
              </Button>
              <CountValue
                name={countInput.id}
                type={"number"}
                min={0}
                value={countInput.value}
                onChange={handleWrite}
              />
              <Button
                buttonType={BUTTON_TYPE_CLASSES.empty}
                onClick={() => {
                  handleClick(countInput.id, "plus");
                }}
              >
                <Plus />
              </Button>
            </CountInput>
          </CountInputElement>
        );
      })}
    </DropdownCountsContainer>
  );
};

export default DropdownCounts;
