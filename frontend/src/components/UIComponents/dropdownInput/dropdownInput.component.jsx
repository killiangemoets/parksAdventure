import { useEffect, useState, useRef, FC } from "react";
import Button from "../button/button.component";
import Dropdown from "./dropdown.component";
import {
  DropdownButtonLeft,
  DropdownIcon,
  DropdownInputContainer,
} from "./dropdownInput.style";

// type DropdownInputProps = {
//   children?: JSX.Element | JSX.Element[] | string | string[] | null;
//   current: Info | null;
//   list: Info[];
//   handler: (value: string) => void;
// };

// const DropdownInput: FC<DropdownInputProps> = ({
const DropdownInput = ({
  children,
  current = "",
  list = [],
  handler = () => {},
  buttonType = undefined,
}) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  //   const dropdownInput = useRef<HTMLDivElement>(null);
  const dropdownInput = useRef(null);

  useEffect(() => {
    // function handleClickOutside(event: MouseEvent): void {
    function handleClickOutside(event) {
      if (
        dropdownInput.current &&
        // !dropdownInput.current.contains(event.target as Node)
        !dropdownInput.current.contains(event.target)
      ) {
        setOpenDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
  }, [dropdownInput]);

  return (
    <DropdownInputContainer ref={dropdownInput}>
      <Button
        buttonType={buttonType}
        onClick={() => {
          setOpenDropdown(!openDropdown);
        }}
      >
        <DropdownButtonLeft>
          {children}
          <p>{current}</p>
        </DropdownButtonLeft>
        <DropdownIcon />
      </Button>
      {openDropdown && (
        <Dropdown
          current={current}
          list={list}
          handler={handler}
          closeDropdown={() => {
            setOpenDropdown(false);
          }}
        />
      )}
    </DropdownInputContainer>
  );
};

export default DropdownInput;
