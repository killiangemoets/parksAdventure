import { FC, useState } from "react";
import Button from "../button/button.component";
import CheckBoxes, {
  CheckBoxesProps,
} from "../checkBoxes/checkBoxes.component";
import { DropdownCheckBoxesContainer } from "./dropdownCheckBoxes.style";

export type DropdownCheckBoxesProps = CheckBoxesProps & {
  closeDropdown: () => void;
};

const DropdownCheckBoxes: FC<DropdownCheckBoxesProps> = ({
  selection,
  options,
  handler,
  allowSelectAll,
  closeDropdown,
}) => {
  const [newSelection, setNewSelection] = useState<Info[]>(selection);

  const handleChange = (infos: Info[]) => {
    setNewSelection(infos);
  };

  return (
    <DropdownCheckBoxesContainer>
      <CheckBoxes
        options={options}
        selection={newSelection}
        allowSelectAll={allowSelectAll}
        handler={handleChange}
      />
      <Button
        onClick={() => {
          closeDropdown();
          handler(newSelection);
        }}>
        Apply
      </Button>
    </DropdownCheckBoxesContainer>
  );
};

export default DropdownCheckBoxes;
