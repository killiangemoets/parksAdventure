import QuickFactsSection from "../quickFactsSection/quickFactsSection.component";
import TourGuidesSection from "../tourGuidesSection/tourGuidesSection.component";
import SummarySection from "../summarySection/summarySection.component";
import {
  TourInfosContainer,
  TourInfosLeft,
  TourInfosLeftWrapper,
  TourInfosRight,
  TourInfosRightWrapper,
  TourInfosWrapper,
} from "./tourInfos.style";

const TourInfos = () => {
  return (
    <TourInfosContainer>
      {/* <TourInfosWrapper> */}
      <TourInfosLeft>
        <TourInfosLeftWrapper>
          <QuickFactsSection />
          <TourGuidesSection />
        </TourInfosLeftWrapper>
      </TourInfosLeft>
      <TourInfosRight>
        {/* <TourInfosRightWrapper> */}
        <SummarySection />
        {/* </TourInfosRightWrapper> */}
      </TourInfosRight>
      {/* </TourInfosWrapper> */}
    </TourInfosContainer>
  );
};

export default TourInfos;
