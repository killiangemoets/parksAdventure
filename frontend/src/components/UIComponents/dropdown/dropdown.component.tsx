import { FC, ReactNode, useEffect, useRef, useState } from "react";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import DropdownCheckBoxes from "./dropdownCheckBoxes.component";
import DropdownCounts, { CountInputState } from "./dropdownCounts.component";
import DropdownInput from "./dropdownInput.component";
import {
  DropdownButtonLeft,
  DropdownContainer,
  DropdownIcon,
} from "./dropdown.style";

export type DropdownCommonProps = {
  children?: ReactNode;
  buttonType?: BUTTON_TYPE_CLASSES;
  error?: boolean;
};

export enum DROPDOWN_TYPE_CLASSES {
  input = "input",
  checkBoxes = "checkBoxes",
  count = "count",
}

export type DropdownConditionalProps =
  | {
      dropdownType: DROPDOWN_TYPE_CLASSES.input;
      current: Info;
      list: Info[];
      keeOpenAfterSelection?: boolean;
      options?: never;
      allowSelectAll?: never;
      selection?: never;
      countInputsState?: never;
      handleInput: (info: Info) => void;
      handleCheckBoxes?: never;
      handleCount?: never;
    }
  | {
      dropdownType: DROPDOWN_TYPE_CLASSES.checkBoxes;
      current?: never;
      list?: never;
      keeOpenAfterSelection?: never;
      options: Info[];
      allowSelectAll?: boolean;
      selection: Info[];
      countInputsState?: never;
      handleInput?: never;
      handleCheckBoxes: (infos: Info[]) => void;
      handleCount?: never;
    }
  | {
      dropdownType: DROPDOWN_TYPE_CLASSES.count;
      current?: never;
      list?: never;
      keeOpenAfterSelection?: never;
      options?: never;
      allowSelectAll?: never;
      selection?: never;
      countInputsState: CountInputState[];
      handleInput?: never;
      handleCheckBoxes?: never;
      handleCount: (value: CountInputState[]) => void;
    };

const Dropdown: FC<DropdownCommonProps & DropdownConditionalProps> = ({
  children,
  buttonType,
  error,
  dropdownType,
  ...otherProps
}) => {
  const {
    current,
    list,
    handleInput,
    keeOpenAfterSelection,
    selection,
    handleCheckBoxes,
    options,
    allowSelectAll,
    countInputsState,
    handleCount,
  } = otherProps;
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

  const getDropdown = (dropdownType: DROPDOWN_TYPE_CLASSES): ReactNode =>
    ({
      [DROPDOWN_TYPE_CLASSES.input]: (
        <DropdownInput
          current={current || { id: "null", value: "" }}
          list={list || []}
          handler={handleInput ? handleInput : (info: Info) => {}}
          closeDropdown={() => {
            setOpenDropdown(false);
          }}
          keeOpenAfterSelection={keeOpenAfterSelection}
        />
      ),
      [DROPDOWN_TYPE_CLASSES.checkBoxes]: (
        <DropdownCheckBoxes
          selection={selection || []}
          handler={handleCheckBoxes ? handleCheckBoxes : (infos: Info[]) => {}}
          options={options || []}
          allowSelectAll={allowSelectAll}
          closeDropdown={() => {
            setOpenDropdown(false);
          }}
        />
      ),
      [DROPDOWN_TYPE_CLASSES.count]: (
        <DropdownCounts
          countInputsState={countInputsState || []}
          handler={handleCount ? handleCount : (value: CountInputState[]) => {}}
        />
      ),
    }[dropdownType]);

  const DropdownElement = getDropdown(dropdownType);

  return (
    <DropdownContainer ref={dropdownInput}>
      <Button
        buttonType={buttonType}
        onClick={() => {
          setOpenDropdown(!openDropdown);
        }}
        style={{ border: error ? "2px solid #ff0033" : "" }}
      >
        <DropdownButtonLeft>
          {children}
          {current && current.value}
        </DropdownButtonLeft>
        <DropdownIcon />
      </Button>
      {openDropdown && DropdownElement}
    </DropdownContainer>
  );
};

export default Dropdown;
