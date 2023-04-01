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
      {!isLoading && (
        <>
          <Title titleType={TITLE_TYPE_CLASSES.section}>
            {`About the ${tour?.name}`}
          </Title>
          <AboutTour>{tour?.description}</AboutTour>
        </>
      )}
    </SummarySectionContainer>
  );
};

export default SummarySection;
