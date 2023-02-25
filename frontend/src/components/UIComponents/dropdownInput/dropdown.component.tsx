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
  console.log(current);
  return (
    <DropdownContainer>
      {list.map((info) => {
        return (
          <Option
            current={info.id === current.id ? true : false}
            key={info.id}
            onClick={() => {
              handler(info);
              closeDropdown();
            }}
          >
            <p>{info.value}</p>
          </Option>
        );
      })}
    </DropdownContainer>
  );
};

export default Dropdown;
