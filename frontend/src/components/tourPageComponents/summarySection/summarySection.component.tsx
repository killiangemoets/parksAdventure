import { useSelector } from "react-redux";
import {
  selectTour,
  selectTourAdditionalInfo,
  selectTourIsLoading,
} from "../../../store/tour/tour.selector";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../UIComponents/title/title.component";
import {
  AboutTour,
  AdditionalInfoModalContent,
  AdditionalInfoModalText,
  AdditionalInfoModalTextElement,
  SummarySectionContainer,
} from "./summarySection.style";
import { Info } from "../tourReviews/tourReviews.style";
import { useState } from "react";
import Modal from "../../UIComponents/modal/modal.component";
import InfoIcon, {
  INFO_ICON_TYPE_CLASSES,
} from "../../UIComponents/infoIcon/infoIcon.component";

const SummarySection = () => {
  const tour = useSelector(selectTour);
  const isLoading = useSelector(selectTourIsLoading);
  const additionalInfo = useSelector(selectTourAdditionalInfo);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <SummarySectionContainer>
      <Title titleType={TITLE_TYPE_CLASSES.section}>
        {!isLoading ? `About the ${tour?.name}` : "About ..."}{" "}
        <Info onClick={() => setModalOpen(true)} />
      </Title>
      <AboutTour>{!isLoading && tour?.description}</AboutTour>
      <Modal
        title={"Additional Information"}
        handleClose={() => {
          setModalOpen(false);
        }}
        open={modalOpen}>
        <AdditionalInfoModalContent>
          {additionalInfo && additionalInfo?.length > 0 ? (
            additionalInfo?.map((info) => (
              <AdditionalInfoModalTextElement>
                <InfoIcon iconType={INFO_ICON_TYPE_CLASSES.bullet} />
                <AdditionalInfoModalText>{info}</AdditionalInfoModalText>
              </AdditionalInfoModalTextElement>
            ))
          ) : (
            <AdditionalInfoModalText>
              No additional information for this tour
            </AdditionalInfoModalText>
          )}
        </AdditionalInfoModalContent>
      </Modal>
    </SummarySectionContainer>
  );
};

export default SummarySection;
