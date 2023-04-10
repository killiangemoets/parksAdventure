import styled from "styled-components";

export const AlertContainer = styled.div`
  position: fixed;
  top: 0;
  z-index: 999 !important;
  padding: 2rem 6.4rem;
  min-width: 40rem;
  background-color: #cc704b;
  /* background-color: #c45050; */
  -webkit-box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.1);
  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;
export const AlertMessage = styled.p`
  text-align: center;
  font-weight: 500;
  /* text-transform: uppercase; */
  font-size: 1.8rem;
  letter-spacing: 1px;
  color: #fff;
`;
