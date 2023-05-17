import { useSelector } from "react-redux";
import {
  selectTour,
  selectTourIsLoading,
} from "../../../store/tour/tour.selector";
import { INFO_ICON_TYPE_CLASSES } from "../../UIComponents/infoIcon/infoIcon.component";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../UIComponents/title/title.component";
import QuickFact from "../quickFact/quickFact.component";
import {
  QuickFacts,
  QuickFactsSectionContainer,
} from "./quickFactsSection.style";

const QuickFactsSection = () => {
  const tour = useSelector(selectTour);
  const isLoading = useSelector(selectTourIsLoading);

  return (
    <QuickFactsSectionContainer>
      <Title titleType={TITLE_TYPE_CLASSES.section}>Quick Facts</Title>
      <QuickFacts>
        <QuickFact
          iconType={INFO_ICON_TYPE_CLASSES.duration}
          name={"Duration"}
          info={
            !isLoading
              ? tour?.duration && tour?.duration > 1
                ? `${tour.duration} days`
                : `${tour?.duration} day`
              : ""
          }
        />
        <QuickFact
          iconType={INFO_ICON_TYPE_CLASSES.difficulty}
          name={"Difficulty"}
          info={
            !isLoading && tour?.difficulty
              ? tour.difficulty[0].toUpperCase() +
                tour.difficulty.slice(1).toLowerCase()
              : ""
          }
        />
        <QuickFact
          iconType={INFO_ICON_TYPE_CLASSES.location}
          name={"Location"}
          info={tour?.location || ""}
        />
        <QuickFact
          iconType={INFO_ICON_TYPE_CLASSES.category}
          name={"Categories"}
          info={
            !isLoading && tour?.categories ? tour.categories.join(", ") : ""
          }
        />
        <QuickFact
          iconType={INFO_ICON_TYPE_CLASSES.group}
          name={"Group Size"}
          info={
            !isLoading
              ? !tour?.maxGroupSizeCapacity
                ? "Not available"
                : tour.maxGroupSizeCapacity === tour.minGroupSizeCapacity
                ? `${tour?.maxGroupSizeCapacity} people`
                : `${tour?.minGroupSizeCapacity}-${tour?.maxGroupSizeCapacity} people`
              : ""
          }
        />
      </QuickFacts>
    </QuickFactsSectionContainer>
  );
};

export default QuickFactsSection;
