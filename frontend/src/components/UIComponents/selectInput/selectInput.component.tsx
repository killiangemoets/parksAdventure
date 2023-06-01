import { FC, SelectHTMLAttributes } from "react";
import { Option, SelectContainer } from "./selectInput.style";
import { Label, TextInputContainer } from "../textInput/textInput.style";

export type SelectInputProps = {
  label: string;
  current: string;
  list: TInfo<string>[];
} & SelectHTMLAttributes<HTMLSelectElement>;

const SelectInput: FC<SelectInputProps> = ({
  label,
  current,
  list,
  ...otherProps
}) => {
  return (
    <TextInputContainer>
      <Label>{label}</Label>
      <SelectContainer {...otherProps}>
        {list.map((listEl) => {
          if (listEl.id === current)
            return (
              <Option value={listEl.id} selected>
                {listEl.value}
              </Option>
            );
          else return <Option value={listEl.id}>{listEl.value}</Option>;
        })}
      </SelectContainer>
    </TextInputContainer>
  );
};

export default SelectInput;
