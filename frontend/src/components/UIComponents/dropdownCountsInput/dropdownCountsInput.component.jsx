import { useEffect, useState, useRef, FC } from "react";
import Button from "../button/button.component";
import DropdownCounts from "./dropdownCounts.component";
import {
  DropdownCountsButtonLeft,
  DropdownCountsIcon,
  DropdownCountsInputContainer,
} from "./dropdownCountsInput.style";

// type DropdownCountsInputProps = {
//   children?: JSX.Element | JSX.Element[] | string | string[] | null;
//   current: Info | null;
//   list: Info[];
//   handler: (value: string) => void;
// };

// const DropdownCountsInput: FC<DropdownCountsInputProps> = ({
const DropdownCountsInput = ({
  label,
  children,
  countInputsState = [],
  handler = () => {},
  buttonType = undefined,
}) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  //   const dropdownCountsInput = useRef<HTMLDivElement>(null);
  const dropdownCountsInput = useRef(null);

  useEffect(() => {
    // function handleClickOutside(event: MouseEvent): void {
    function handleClickOutside(event) {
      if (
        dropdownCountsInput.current &&
        // !dropdownCountsInput.current.contains(event.target as Node)
        !dropdownCountsInput.current.contains(event.target)
      ) {
        setOpenDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
  }, [dropdownCountsInput]);

  return (
    <DropdownCountsInputContainer ref={dropdownCountsInput}>
      <Button
        style={{ width: "26rem" }}
        buttonType={buttonType}
        onClick={() => {
          setOpenDropdown(!openDropdown);
        }}
      >
        <DropdownCountsButtonLeft>
          {children}
          <p>{label}</p>
        </DropdownCountsButtonLeft>
        <DropdownCountsIcon />
      </Button>
      {openDropdown && (
        <DropdownCounts countInputsState={countInputsState} handler={handler} />
      )}
    </DropdownCountsInputContainer>
  );
};

export default DropdownCountsInput;
