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
  padding-top: 6.4rem;
  gap: 6.4rem;
  width: 100%;
  max-width: 130rem;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1rem;
`;

export const CartBody = styled.div`
  padding: 0 3.2rem;
  position: relative;
  width: 100%;
  min-height: 24rem;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media (max-width: 780px) {
    align-items: center;
    width: 100%;
  }
`;

export const ItemsList = styled.div`
  width: 100%;
  max-width: calc(100% - 46rem);

  @media (max-width: 780px) {
    max-width: none;
  }
`;

export const SoldOutItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CartCheckout = styled.div`
  position: absolute;
  top: 3.2rem;
  right: 0rem;
  padding-right: 3.2rem;

  @media (max-width: 780px) {
    padding-right: 0;
    position: relative;
    top: 0rem;
    width: 100%;
  }
`;

export const CartEmpty = styled.div`
  width: 100%;
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
