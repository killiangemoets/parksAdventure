import { FC } from "react";
import { DropdownContainer, Option } from "./dropdownInput.style";

export type DropdownProps = {
  current: Info;
  list: Info[];
  handler: (info: Info) => void;
  keeOpenAfterSelection?: boolean;
};

type DropdownPropsTotal = DropdownProps & {
  closeDropdown: () => void;
};

const DropdownInput: FC<DropdownPropsTotal> = ({
  current,
  list,
  closeDropdown,
  handler,
  keeOpenAfterSelection = false,
}) => {
  return (
    <DropdownContainer>
      {list.map((info) => {
        return (
          <Option
            current={info.id === current.id ? true : false}
            key={info.id}
            onClick={() => {
              handler(info);
              !keeOpenAfterSelection && closeDropdown();
            }}>
            {info.value}
          </Option>
        );
      })}
    </DropdownContainer>
  );
};

export default DropdownInput;
