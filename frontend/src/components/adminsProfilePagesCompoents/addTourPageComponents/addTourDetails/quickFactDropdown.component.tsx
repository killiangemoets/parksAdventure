import { FC } from "react";
import {
  QuickFactName,
  QuickFactType,
} from "../../../tourPageComponents/quickFact/quickFact.style";
import InfoIcon, {
  INFO_ICON_TYPE_CLASSES,
} from "../../../UIComponents/infoIcon/infoIcon.component";
import { QuickFactInputContainer } from "./quickFactInput.style";

import { BUTTON_TYPE_CLASSES } from "../../../UIComponents/button/button.component";
import Dropdown, {
  DROPDOWN_TYPE_CLASSES,
} from "../../../UIComponents/dropdown/dropdown.component";

export type QuickFactProps = {
  iconType: INFO_ICON_TYPE_CLASSES;
  handleChange: (info: Info, name: string) => void;
  infoName: string;
  name: string;
  current: Info;
  dropdownList: Info[];
};

const QuickFactDropdown: FC<QuickFactProps> = ({
  iconType,
  infoName,
  name,
  handleChange,
  current,
  dropdownList,
}) => {
  const onChange = (info: Info) => {
    handleChange(info, name);
  };

  return (
    <QuickFactInputContainer>
      <QuickFactType>
        <InfoIcon iconType={iconType} />
        <QuickFactName>{infoName}</QuickFactName>
      </QuickFactType>
      <Dropdown
        dropdownType={DROPDOWN_TYPE_CLASSES.input}
        current={current}
        list={dropdownList ? dropdownList : []}
        handleInput={onChange}
        buttonType={BUTTON_TYPE_CLASSES.rectangular}
      />
    </QuickFactInputContainer>
  );
};

export default QuickFactDropdown;
