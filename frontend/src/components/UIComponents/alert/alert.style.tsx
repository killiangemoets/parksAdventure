import styled from "styled-components";

export const AlertContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999 !important;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AlertWrapper = styled.div`
  padding: 2rem 6.4rem;
  min-width: 40rem;
  background-color: #cc704b;
  -webkit-box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.1);
  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  @media (max-width: 0px) {
    min-width: 0%;
    width: 100%;
    margin: 0 2rem;
  }
`;
export const AlertMessage = styled.p`
  text-align: center;
  font-weight: 500;
  font-size: 1.8rem;
  letter-spacing: 1px;
  color: #fff;
`;
