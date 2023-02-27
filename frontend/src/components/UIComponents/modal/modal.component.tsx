import { FC, useEffect, useRef } from "react";
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
  handleClose: () => void;
  closeOnClickOnOverlay?: boolean;
  open: boolean;
};

const Modal: FC<ModalProps> = ({
  title,
  children,
  handleClose,
  open,
  closeOnClickOnOverlay = true,
}) => {
  const popupRef = useRef<HTMLDivElement | null>(null);

  const handleClickOnOverlay = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (
      closeOnClickOnOverlay &&
      popupRef.current &&
      !popupRef.current.contains(e.target as Node)
    ) {
      handleClose();
    }
  };

  useEffect(() => {
    document.body.style.overflowY = open ? "hidden" : "scroll";
  }, [open]);

  return (
    <Overlay
      onClick={handleClickOnOverlay}
      style={{ display: open ? "flex" : "none" }}
    >
      <ModalContainer ref={popupRef}>
        <ModalTitleSection>
          <ModalTitle>{title}</ModalTitle>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.empty}
            onClick={() => handleClose()}
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
