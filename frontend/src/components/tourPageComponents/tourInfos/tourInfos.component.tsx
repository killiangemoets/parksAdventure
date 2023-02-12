import QuickFactsSection from "../quickFactsSection/quickFactsSection.component";
import TourGuidesSection from "../tourGuidesSection/tourGuidesSection.component";
import SummarySection from "../summarySection/summarySection.component";
import {
  TourInfosContainer,
  TourInfosLeft,
  TourInfosLeftWrapper,
  TourInfosRight,
} from "./tourInfos.style";

const TourInfos = () => {
  return (
    <TourInfosContainer>
      <TourInfosLeft>
        <TourInfosLeftWrapper>
          <QuickFactsSection />
          <TourGuidesSection />
        </TourInfosLeftWrapper>
      </TourInfosLeft>
      <TourInfosRight>
        <SummarySection />
      </TourInfosRight>
    </TourInfosContainer>
  );
};

export default TourInfos;
