import InfoIcon from "../../UIComponents/infoIcon/infoIcon.component";
import {
  QuickFactContainer,
  QuickFactInfo,
  QuickFactName,
  QuickFactType,
} from "./quickFact.style";

const QuickFact = ({ iconType, name, info }) => {
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
