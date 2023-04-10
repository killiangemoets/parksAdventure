import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0%;
  left: 0%;
  width: 100vw;
  height: 100vh;
  background-color: rgba(187, 187, 187, 0.4);
  z-index: 999 !important;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContainer = styled.div`
  /* padding: 0rem 6.4rem 3.2rem 6.4rem; */
  background-color: #fffefc;
  border-radius: 24px;
  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  min-height: 20rem;
  min-width: 20rem;
  /* gap: 4.8rem; */
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
`;
export const ModalTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.6px;
  /* letter-spacing: 1px; */
  color: #cc704b;
  /* text-transform: uppercase; */
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
`;
