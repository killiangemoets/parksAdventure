import { GreenOpacity } from "../../../routes/home/home.style";
import {
  MainHeaderContainer,
  MainHeaderContentContainer,
  MainHeaderLogoContainer,
  MainHeaderText,
} from "./mainHeader.style";

const MainHeader = () => {
  return (
    <MainHeaderContainer>
      <GreenOpacity>
        <MainHeaderContentContainer>
          <MainHeaderLogoContainer />
          <MainHeaderText>Explort Our Nature</MainHeaderText>
        </MainHeaderContentContainer>
      </GreenOpacity>
    </MainHeaderContainer>
  );
};

export default MainHeader;
