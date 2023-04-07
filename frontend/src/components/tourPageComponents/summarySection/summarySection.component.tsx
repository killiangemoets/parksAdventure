import { useSelector } from "react-redux";
import {
  selectTour,
  selectTourIsLoading,
} from "../../../store/tour/tour.selector";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../UIComponents/title/title.component";
import { AboutTour, SummarySectionContainer } from "./summarySection.style";

const SummarySection = () => {
  const tour = useSelector(selectTour);
  const isLoading = useSelector(selectTourIsLoading);
  return (
    <SummarySectionContainer>
      <Title titleType={TITLE_TYPE_CLASSES.section}>
        {!isLoading ? `About the ${tour?.name}` : "About ..."}
      </Title>
      <AboutTour>{!isLoading && tour?.description}</AboutTour>
    </SummarySectionContainer>
  );
};

export default SummarySection;
