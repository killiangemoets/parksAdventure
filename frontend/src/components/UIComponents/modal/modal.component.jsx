import { Children, useRef } from "react";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
  CloseIcon,
  ModalContainer,
  ModalContent,
  ModalTitle,
  ModalTitleSection,
  Overlay,
} from "./modal.style";

const Modal = ({ title, children, handleOpen = () => {} }) => {
  const popupRef = useRef(null);

  const handleClickOnOverlay = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target))
      handleOpen(false);
  };
  return (
    <Overlay onClick={handleClickOnOverlay}>
      <ModalContainer ref={popupRef}>
        <ModalTitleSection>
          <ModalTitle>{title}</ModalTitle>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.empty}
            onClick={() => handleOpen(false)}
          >
            <CloseIcon />
          </Button>
        </ModalTitleSection>
        <ModalContent>{children}</ModalContent>
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;
