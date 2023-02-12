import { useEffect, useState, useRef, FC } from "react";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import Dropdown from "./dropdown.component";
import {
  DropdownButtonLeft,
  DropdownIcon,
  DropdownInputContainer,
} from "./dropdownInput.style";

export type DropdownInputProps = {
  children?: React.ReactNode;
  current: string;
  list: string[];
  handler: (value: string) => void;
  buttonType?: BUTTON_TYPE_CLASSES;
};

const DropdownInput: FC<DropdownInputProps> = ({
  children,
  current,
  list,
  handler,
  buttonType,
}) => {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const dropdownInput = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        dropdownInput.current &&
        !dropdownInput.current.contains(event.target as Node)
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
