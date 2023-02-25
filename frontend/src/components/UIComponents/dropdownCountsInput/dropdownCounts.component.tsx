import { FC } from "react";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import CountInput from "../countInput/countInput.component";
import {
  // CountInput,
  CountInputElement,
  CountInputInfos,
  CountInputSubTitle,
  CountInputTitle,
  CountValue,
  DropdownCountsContainer,
  Minus,
  Plus,
} from "./dropdownCounts.style";

import {
  CountInputState,
  DropdownCountsInputProps,
} from "./dropdownCountsInput.component";

type DropdownCountsProps = {
  countInputsState: DropdownCountsInputProps["countInputsState"];
  handler: DropdownCountsInputProps["handler"];
};

const DropdownCounts: FC<DropdownCountsProps> = ({
  countInputsState,
  handler,
}) => {
  // const handleClick = (id: CountInputState["id"], type: string): void => {
  //   const newCountInputsState = countInputsState.map((countInput) => {
  //     return {
  //       ...countInput,
  //       value:
  //         countInput.id === id
  //           ? type === "minus"
  //             ? countInput.value - 1 < 0
  //               ? 0
  //               : countInput.value - 1
  //             : countInput.value + 1
  //           : countInput.value,
  //     };
  //   });
  //   handler(newCountInputsState);
  // };

  // const handleWrite = (event: React.ChangeEvent<HTMLInputElement>): void => {
  //   let value: number = +event.target.value;
  //   const { name: id } = event.target;
  //   if (value < 0 || !value) value = 0;
  //   const newCountInputsState = countInputsState.map((countInput) => {
  //     return {
  //       ...countInput,
  //       value: countInput.id === id ? +value : countInput.value,
  //     };
  //   });
  //   handler(newCountInputsState);
  // };

  const handleUpdate = (value: number, id: string): void => {
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
            {/* <CountInput>
              <Button
                buttonType={BUTTON_TYPE_CLASSES.empty}
                onClick={() => {
                  handleClick(countInput.id, "minus");
                }}
              >
                <Minus />
              </Button>
              <CountValue
                name={countInput.id.toString()}
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
            </CountInput> */}
            <CountInput
              value={countInput.value}
              name={countInput.id.toString()}
              updateValue={handleUpdate}
            />
          </CountInputElement>
        );
      })}
    </DropdownCountsContainer>
  );
};

export default DropdownCounts;
