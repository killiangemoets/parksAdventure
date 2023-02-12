import { FC, useRef } from "react";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
  CloseIcon,
  ModalContainer,
  ModalContent,
  ModalTitle,
  ModalTitleSection,
  Overlay,
} from "./modal.style";

export type ModalProps = {
  title: string;
  children: React.ReactNode;
  handleOpen: (value: boolean) => void;
};

const Modal: FC<ModalProps> = ({ title, children, handleOpen }) => {
  const popupRef = useRef<HTMLDivElement | null>(null);

  const handleClickOnOverlay = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (popupRef.current && !popupRef.current.contains(e.target as Node))
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
