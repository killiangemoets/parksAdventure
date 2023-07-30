import styled from "styled-components";

export const CheckoutCardContainer = styled.div`
  border-radius: 12px;
  border: solid 1px #aaa;
  padding: 2rem 0;
  width: 40rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4.8rem;

  @media (max-width: 780px) {
    width: 100%;
    padding: 2rem 3.2rem;

    button {
      width: 100%;
    }
  }
`;
export const CheckoutCardBody = styled.div`
  display: flex;
  gap: 4.8rem;

  @media (max-width: 780px) {
    width: 100%;
    justify-content: space-between;
  }
`;
export const CheckoutCardTitle = styled.h5`
  font-size: 1.8rem;
  font-weight: 600;
  text-transform: capitalize;
  letter-spacing: 0.2px;
  white-space: nowrap;
`;
export const CheckoutCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  align-items: flex-end;
`;
export const CheckoutCardTotal = styled.p`
  font-size: 1.8rem;
  font-weight: 600;
  text-transform: capitalize;
  letter-spacing: 1px;
`;
export const CheckoutCardText = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  letter-spacing: 0.4px;
  color: #888;
  text-align: end;
`;
