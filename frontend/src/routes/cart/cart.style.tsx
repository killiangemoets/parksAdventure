import styled from "styled-components";

export const CartContainer = styled.div`
  padding-top: 8rem;
  min-height: calc(100vh - 8rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const CartWrapper = styled.div`
  padding: 6.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6.4rem;
  width: 100%;
  max-width: 130rem;
`;

export const CartBody = styled.div`
  position: relative;
  width: 100%;
  min-height: 24rem;
`;

export const ItemsList = styled.div`
  width: 100%;
`;

export const CartCheckout = styled.div`
  position: absolute;
  top: 3.2rem;
  right: 0rem;
`;

export const CartEmpty = styled.div`
  min-height: 24rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6.4rem;
`;

export const CartMessage = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.6px;
  width: 100%;
  text-align: center;
`;

export const CartSpinner = styled.div`
  width: 100%;
  height: 100%;
  min-height: 24rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
