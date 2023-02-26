import { FC } from "react";
import CountInput from "../countInput/countInput.component";
import {
  CountInputElement,
  CountInputInfos,
  CountInputSubTitle,
  CountInputTitle,
  DropdownCountsContainer,
} from "./dropdownCounts.style";

export type CountInputState = {
  id: string | number;
  title: string;
  subtitle: string | undefined;
  value: number;
};

type DropdownCountsProps = {
  countInputsState: CountInputState[];
  handler: (value: CountInputState[]) => void;
};

const DropdownCounts: FC<DropdownCountsProps> = ({
  countInputsState,
  handler,
}) => {
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
