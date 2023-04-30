import styled, { css } from "styled-components";
import { CHECKOUT_STATES, TCheckoutState } from "../../../types/booking";

type StateProp = {
  state?: TCheckoutState;
};

export const CheckoutStepContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const CheckoutStepCircle = styled.div<StateProp>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: none;
  border: 2px solid #aaa;
  border-radius: 999px;
  width: 5rem;
  height: 5rem;
  ${({ state }) => {
    if (state === CHECKOUT_STATES.done) {
      return css`
        border: 2px solid #cc704b;
      `;
    }
    if (state === CHECKOUT_STATES.in_progress) {
      return css`
        border: 2px solid #cc704b;
        background-color: #cc704b;
      `;
    }
  }}
`;
export const CheckoutStepNumber = styled.p<StateProp>`
  font-size: 2.2rem;
  font-weight: 500;
  color: #aaa;
  ${({ state }) => {
    if (state === CHECKOUT_STATES.done) {
      return css`
        color: #cc704b;
      `;
    }
    if (state === CHECKOUT_STATES.in_progress) {
      return css`
        color: #fff;
      `;
    }
  }}
`;
export const CheckoutStepTitle = styled.h5<StateProp>`
  position: absolute;
  bottom: -3.2rem;
  font-size: 1.6rem;
  font-weight: 500;
  text-transform: capitalize;
  letter-spacing: 1px;
  width: 10rem;
  text-align: center;
  color: #aaa;
  ${({ state }) => {
    if (
      state === CHECKOUT_STATES.done ||
      state === CHECKOUT_STATES.in_progress
    ) {
      return css`
        color: #cc704b;
      `;
    }
  }}
`;

export const CheckoutLineContainer = styled.div`
  padding-top: 8rem;
  padding: calc(6.4rem + 8rem) 6.4rem 6.4rem 6.4rem;
  display: flex;
  flex-direction: column;
  gap: 12.8rem;
  align-items: center;
  min-height: calc(100vh - 8rem);
`;
export const CheckoutLineElement = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;
export const CheckoutContent = styled.div`
  width: 100%;
  max-width: 100rem;
`;

type CheckoutLineBetweenStepsProps = {
  passed?: boolean;
};

export const CheckoutLineBetweenSteps = styled.div<CheckoutLineBetweenStepsProps>`
  /* margin-top: calc(2.5rem - 0.1rem); */
  height: 0.2rem;
  width: 10rem;
  background-color: #aaa;
  ${({ passed }) =>
    passed &&
    css`
      background-color: #cc704b;
    `}
`;
