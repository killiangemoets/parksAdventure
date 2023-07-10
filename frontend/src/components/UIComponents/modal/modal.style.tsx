import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0%;
  left: 0%;
  width: 100vw;
  height: 100vh;
  background-color: rgba(187, 187, 187, 0.4);
  z-index: 20 !important;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3.2rem;
`;

export const ModalContainer = styled.div`
  background-color: #fffefc;
  border-radius: 18px;
  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  min-height: 20rem;
  min-width: 20rem;
  z-index: 999 !important;
`;
export const ModalTitleSection = styled.div`
  padding: 2rem 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #aaa;

  button {
    position: absolute;
    top: 2rem;
    right: 2rem;
  }

  @media (max-width: 480px) {
    padding: 1.4rem 0;
  }
`;
export const ModalTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.6px;
  color: #cc704b;
`;

export const ModalContent = styled.div`
  padding: 4.8rem 6.4rem 4.8rem 6.4rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;

  img {
    max-height: 68vh;
    max-width: 80vh;
  }

  @media (max-width: 480px) {
    gap: 2rem;
    padding: 1rem 3.6rem 2.4rem 3.6rem;
  }
`;
