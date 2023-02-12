// import { FC } from "react";
import { FC } from "react";
import { DropdownContainer, Option } from "./dropdown.style";

import { DropdownInputProps } from "./dropdownInput.component";

type DropdownProps = {
  current: DropdownInputProps["current"];
  list: DropdownInputProps["list"];
  handler: DropdownInputProps["handler"];
  closeDropdown: () => void;
};

const Dropdown: FC<DropdownProps> = ({
  current,
  list,
  closeDropdown,
  handler,
}) => {
  return (
    <DropdownContainer>
      {list.map((el) => {
        return (
          <Option
            current={el === current ? true : false}
            key={el}
            onClick={() => {
              handler(el);
              closeDropdown();
            }}
          >
            <p>{el}</p>
          </Option>
        );
      })}
    </DropdownContainer>
  );
};

export default Dropdown;
