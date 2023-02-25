import { FC } from "react";
import {
  QuickFactName,
  QuickFactType,
} from "../../../tourPageComponents/quickFact/quickFact.style";
import InfoIcon, {
  INFO_ICON_TYPE_CLASSES,
} from "../../../UIComponents/infoIcon/infoIcon.component";
import { QuickFactInputContainer } from "./quickFactInput.style";
import DropdownInput, {
  DropdownInputProps,
  Info,
} from "../../../UIComponents/dropdownInput/dropdownInput.component";
import { BUTTON_TYPE_CLASSES } from "../../../UIComponents/button/button.component";

export type QuickFactProps = {
  iconType: INFO_ICON_TYPE_CLASSES;
  handleChange: (info: Info, name: string) => void;
  infoName: string;
  name: string;
  current: Info;
  dropdownList: DropdownInputProps["list"];
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
      <DropdownInput
        list={dropdownList ? dropdownList : []}
        current={current}
        handler={(info) => {
          onChange(info);
        }}
        buttonType={BUTTON_TYPE_CLASSES.light}
      />
    </QuickFactInputContainer>
  );
};

export default QuickFactDropdown;
