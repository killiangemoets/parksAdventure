import { FC } from "react";
import InfoIcon, {
  INFO_ICON_TYPE_CLASSES,
} from "../../UIComponents/infoIcon/infoIcon.component";
import {
  QuickFactContainer,
  QuickFactInfo,
  QuickFactName,
  QuickFactType,
} from "./quickFact.style";

export type QuickFactProps = {
  iconType: INFO_ICON_TYPE_CLASSES;
  name: string;
  info: string;
};

const QuickFact: FC<QuickFactProps> = ({ iconType, name, info }) => {
  return (
    <QuickFactContainer>
      <QuickFactType>
        <InfoIcon iconType={iconType} />
        <QuickFactName>{name}</QuickFactName>
      </QuickFactType>
      <QuickFactInfo>{info}</QuickFactInfo>
    </QuickFactContainer>
  );
};

export default QuickFact;
