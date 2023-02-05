// import { FC } from "react";
import { DropdownContainer, Option } from "./dropdown.style";

// type DropdownProps = {
//   current: Info | null,
//   list: Info[],
//   handler: (value: string) => void,
//   closeDropdown: () => void,
// };

// const Dropdown: FC<DropdownProps> = ({
const Dropdown = ({ current, list, closeDropdown, handler }) => {
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
