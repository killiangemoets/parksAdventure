import { useEffect, useState, useRef, FC, ReactNode } from "react";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import DropdownCounts from "./dropdownCounts.component";
import {
  DropdownCountsButtonLeft,
  DropdownCountsIcon,
  DropdownCountsInputContainer,
} from "./dropdownCountsInput.style";

export type CountInputState = {
  id: string | number;
  title: string;
  subtitle: string | undefined;
  value: number;
};

export type DropdownCountsInputProps = {
  label: string | React.ReactNode;
  children: ReactNode;
  countInputsState: CountInputState[];
  handler: (value: CountInputState[]) => void;
  buttonType?: BUTTON_TYPE_CLASSES;
};

const DropdownCountsInput: FC<DropdownCountsInputProps> = ({
  label,
  children,
  countInputsState,
  handler,
  buttonType,
}) => {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const dropdownCountsInput = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        dropdownCountsInput.current &&
        !dropdownCountsInput.current.contains(event.target as Node)
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
