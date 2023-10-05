import { useSelector } from "react-redux";
import {
  selectTour,
  selectTourIsLoading,
} from "../../../store/tour/tour.selector";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../UIComponents/title/title.component";
import TourGuide from "../tourGuide/tourGuide.component";
import {
  TourGuides,
  TourGuidesSectionContainer,
} from "./tourGuidesSection.style";

const TourGuidesSection = () => {
  const tour = useSelector(selectTour);
  const isLoading = useSelector(selectTourIsLoading);
  return (
    <TourGuidesSectionContainer>
      <Title titleType={TITLE_TYPE_CLASSES.section}>Your Tour Guides</Title>
      {!isLoading && (
        <>
          <TourGuides>
            {tour?.guides &&
              tour?.guides.map((guide) => (
                <TourGuide
                  key={guide._id}
                  pictureUrl={guide.photo}
                  position={guide.role}
                  name={`${guide.firstname} ${guide.lastname}`}
                />
              ))}
          </TourGuides>
        </>
      )}
    </TourGuidesSectionContainer>
  );
};

export default TourGuidesSection;
